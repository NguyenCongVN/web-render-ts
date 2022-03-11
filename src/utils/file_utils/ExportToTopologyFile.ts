import clone from "clone";
import { Host } from "../classes/Host";
import { Link } from "../classes/Link";
import { TypeAttack } from "../enums/TypeAttacks";
import { convertLabel } from "./StringUtil";
export interface ConnectedDictInterface {
  [id: string]: Host[];
}

const GetHostFromLabel = (hosts: Host[], label: string): Host | undefined => {
  let hostFound = hosts.find((host) => host.label.text === label);
  return hostFound;
};

const CheckConnectedHostDFS = (
  hosts: Host[],
  key: string,
  connectedDict: { [id: string]: Host[] },
  connectedHost: Host[],
  visitedHost: Host[]
) => {
  for (var i = 0; i < connectedDict[key].length; i++) {
    let hostNeighbor = connectedDict[key][i];
    if (visitedHost.indexOf(hostNeighbor) === -1) {
      visitedHost.push(hostNeighbor);
      if (!hostNeighbor.IsRouter && !hostNeighbor.IsSwitch) {
        connectedHost.push(hostNeighbor);
      } else {
        CheckConnectedHostDFS(
          hosts,
          hostNeighbor.label.text,
          connectedDict,
          connectedHost,
          visitedHost
        );
      }
    }
  }
};

export const GetConnectedDict = (
  links: Link[],
  hosts: Host[]
): ConnectedDictInterface => {
  let connectedDict: { [id: string]: Host[] } = {};

  //   Thêm thông tin vào các links với thông tin từ hosts
  for (var i = 0; i < links.length; i++) {
    links[i].hosts = [];
    for (var j = 0; j < links[i].nodes.length; j++) {
      let hostFound = hosts.find(
        // eslint-disable-next-line no-loop-func
        (host) => host.node_id === links[i].nodes[j].node_id
      );
      if (hostFound) {
        links[i].hosts.push(hostFound);
      }
    }
  }

  // Lặp qua các link có trong mạng
  links.forEach((link) => {
    if (link.hosts.length > 0) {
      // Tạo dict với các host kết nối
      link.hosts.forEach((host) => {
        if (!connectedDict[host.label.text]) {
          connectedDict[host.label.text] = [];
        }
        //  Thêm các host kết nối cùng dây vào trong connectedDict
        let otherHost = link.hosts.filter(
          (hostCheck) => host.node_id !== hostCheck.node_id
        );
        connectedDict[host.label.text].push(...otherHost);
      });
    }
  });

  // DFS tìm ra các host kết nối
  let cloneConnectedDict = clone(connectedDict);
  for (const [key] of Object.entries(connectedDict)) {
    let connectedHost: Host[] = [];
    let visitedHost: Host[] = [];
    CheckConnectedHostDFS(
      hosts,
      key,
      connectedDict,
      connectedHost,
      visitedHost
    );
    cloneConnectedDict[key] = connectedHost;
  }

  connectedDict = cloneConnectedDict;

  //   Kiểm tra các host là switch hoặc router
  for (const [key, value] of Object.entries(connectedDict)) {
    let hostFound = GetHostFromLabel(hosts, key);
    if (hostFound) {
      if (hostFound.IsRouter || hostFound.IsSwitch) {
        for (i = 0; i < value.length; i++) {
          // eslint-disable-next-line no-loop-func
          if (connectedDict[value[i].label.text]) {
            // Xóa đi router hoặc switch có sẵn
            connectedDict[value[i].label.text] = connectedDict[
              value[i].label.text
            ].filter((host) => host !== hostFound);
          }
        }
        delete connectedDict[hostFound.label.text];
      } else {
        connectedDict[key] = connectedDict[key].filter(
          (host) => host !== hostFound
        );
      }
    }
  }

  console.log(connectedDict);

  // Kiểm tra các host là router -> kiểm tra bị chặn
  for (const host of hosts) {
    if (host.IsRouter && host.BlackListDirections.length > 0) {
      host.BlackListDirections.forEach((blackDirection) => {
        let hostFromFound = GetHostFromLabel(hosts, blackDirection.from);
        let hostToFound = GetHostFromLabel(hosts, blackDirection.to);
        if (
          connectedDict[blackDirection.from] &&
          hostFromFound &&
          hostToFound
        ) {
          connectedDict[blackDirection.from] = connectedDict[
            blackDirection.from
          ].filter((host) => host !== hostToFound);
        }
      });
    }
  }
  return connectedDict;
};

export const ExportToTopologyFile = (
  hosts: Host[],
  links: Link[],
  typeAttack: TypeAttack
): string => {
  let output: string = "";

  // Thêm thông tin isAttacker và isTarget.
  for (var i = 0; i < hosts.length; i++) {
    if (hosts[i].isAttacker) {
      output += `attackerLocated(${convertLabel(hosts[i].label.text)}).\n`;
    }

    if (hosts[i].isTarget) {
      output += `attackGoal(execCode(${convertLabel(
        hosts[i].label.text
      )}, _)).\n`;
    }
  }

  output += "\n\n";

  let connectedDict = GetConnectedDict(links, hosts);

  //   Lưu các hacl vào output string
  for (const [key, value] of Object.entries(connectedDict)) {
    // eslint-disable-next-line no-loop-func
    value.forEach((host) => {
      output += `hacl(${convertLabel(key)},${convertLabel(
        host.label.text
      )},_ ,_).\n`;
    });
  }

  output += "\n\n\n";

  //  Thêm thông tin các host đã có
  hosts.forEach((host) => {
    if (!host.IsRouter && !host.IsSwitch) {
      output += `/* configuration information of ${convertLabel(
        host.label.text
      )} */\n`;
      host.Vulnerbilities.forEach((vuln) => {
        output += `vulExists(${convertLabel(host.label.text)}, '${
          vuln.vulExist.cve
        }', ${vuln.vulExist.service}).\nvulProperty(${vuln.vulProp.cve}, ${
          vuln.vulProp.typeExploit
        }, ${vuln.vulProp.isPrivEscalation ? "privEscalation" : ""}).\n`;
      });

      host.Services.forEach((service) => {
        output += `networkServiceInfo(${convertLabel(host.label.text)}, ${
          service.service
        }, ${service.protocol}, ${service.port} , '${
          service.privilege_user
        }').\n`;
      });

      // Nếu như là real attack thì thêm dòng template
      if (typeAttack === TypeAttack.Real_Attack) {
        if (!host.IsRouter && !host.IsSwitch && !host.isAttacker) {
          output += `---REAL_ATTACK_TEMPLATE---${convertLabel(
            host.label.text
          )}---\n`;
        }
      }

      host.NSFExportInfo.forEach((nfsExport) => {
        output += `nfsExportInfo(${convertLabel(host.label.text)}, '${
          nfsExport.path
        }', ${nfsExport.type}, ${nfsExport.fileServer}).\n`;
      });

      host.NSFMounted.forEach((nfsMounted) => {
        output += `nfsMounted(${convertLabel(host.label.text)}, '${
          nfsMounted.localPath
        }', ${nfsMounted.fileServer}, '${nfsMounted.fileServerPath}', ${
          nfsMounted.accessType
        }).\n`;
      });

      output += "\n";
    }
  });

  console.log(output);
  return output;
};

export const ExportScanConfigFile = (hosts: Host[]): string | null => {
  // Scan config
  let scanConfigString = "";
  for (var i = 0; i < hosts.length; i++) {
    if (!hosts[i].IsSwitch && !hosts[i].IsRouter) {
      if (hosts[i].NetworkIP === undefined || hosts[i].ScanIP === undefined) {
        return null;
      }
      if (hosts[i].isAttacker) {
        scanConfigString += `${convertLabel(hosts[i].label.text)},${
          hosts[i].NetworkIP
        },${hosts[i].ScanIP},isAttacker\n`;
      } else {
        scanConfigString += `${convertLabel(hosts[i].label.text)},${
          hosts[i].NetworkIP
        },${hosts[i].ScanIP},notIsAttacker\n`;
      }
    }
  }
  console.log(scanConfigString);
  return scanConfigString;
};

export const ExportToConnectedMap = (hosts: Host[], links: Link[]): string => {
  let connectedDict = GetConnectedDict(links, hosts);
  let connectedIPDict: { [hostName: string]: string[] } = {};
  for (const [hostName, connectedHosts] of Object.entries(connectedDict)) {
    connectedIPDict[convertLabel(hostName)] = connectedHosts.map((connectedHost) => {
      return connectedHost.NetworkIP;
    });
  }
  let json = JSON.stringify(connectedIPDict);
  return json;
};
