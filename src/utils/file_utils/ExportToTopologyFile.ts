import { Host } from "../classes/Host";
import { Link } from "../classes/Link";
import { TypeAttack } from "../enums/TypeAttacks";
import { convertLabel } from "./StringUtil";
const GetHostFromLabel = (hosts: Host[], label: string): Host | undefined => {
  let hostFound = hosts.find((host) => host.label.text === label);
  return hostFound;
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

  let connectedDict: { [id: string]: Host[] } = {};

  //   Thêm thông tin vào các links với thông tin từ hosts
  for (i = 0; i < links.length; i++) {
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

  //   Kiểm tra các host là switch hoặc router
  for (const [key, value] of Object.entries(connectedDict)) {
    let hostFound = GetHostFromLabel(hosts, key);
    if (hostFound) {
      if (hostFound.IsRouter || hostFound.IsSwitch) {
        for (i = 0; i < value.length; i++) {
          // eslint-disable-next-line no-loop-func
          if (connectedDict[value[i].label.text]) {
            // eslint-disable-next-line no-loop-func
            let otherHostInNetwork = value.filter((host) => host !== value[i]);
            // eslint-disable-next-line no-loop-func
            otherHostInNetwork.forEach((otherHost) => {
              let otherHostFound = GetHostFromLabel(
                hosts,
                otherHost.label.text
              );
              if (otherHostFound) {
                if (!otherHostFound.IsRouter && !otherHostFound.IsSwitch) {
                  connectedDict[value[i].label.text].push(otherHost);
                }
              }
            });
            // Xóa đi router hoặc switch có sẵn
            connectedDict[value[i].label.text] = connectedDict[
              value[i].label.text
            ].filter((host) => host !== hostFound);
          }
        }
        delete connectedDict[hostFound.label.text];
      }
    }
  }

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
  });

  console.log(output);
  return output;
};

export const ExportScanConfigFile = (hosts: Host[]): string | null => {
  // Scan config
  let scanConfigString = "";
  for (var i = 0; i < hosts.length; i++) {
    if (!hosts[i].isAttacker && !hosts[i].IsSwitch && !hosts[i].IsRouter) {
      console.log(hosts[i]);
      if (hosts[i].NetworkIP === undefined || hosts[i].ScanIP === undefined) {
        return null;
      }
      scanConfigString += `${convertLabel(hosts[i].label.text)},${
        hosts[i].NetworkIP
      },${hosts[i].ScanIP}\n`;
    }
  }
  console.log(scanConfigString);
  return scanConfigString;
};
