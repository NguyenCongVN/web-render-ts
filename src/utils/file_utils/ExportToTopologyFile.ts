import { Host } from "../classes/Host";
import { Link } from "../classes/Link";

const GetHostFromLabel = (hosts: Host[], label: string): Host | undefined => {
  let hostFound = hosts.find((host) => host.label.text === label);
  return hostFound;
};

export const ExportToTopologyFile = (hosts: Host[], links: Link[]): string => {
  let output: string = "";

  let connectedDict: { [id: string]: Host[] } = {};

  //   Thêm thông tin vào các links với thông tin từ hosts
  for (var i = 0; i < links.length; i++) {
    links[i].hosts = [];
    for (var j = 0; j < links[i].nodes.length; j++) {
      let hostFound = hosts.find(
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
      if (hostFound.IsRouter() || hostFound.IsSwitch()) {
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
                if (!otherHostFound.IsRouter() && !otherHostFound.IsSwitch()) {
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
      output += `hacl(${key},${host.label.text}, _ , _)\n`;
    });
  }

  output += "\n\n\n";

  //  Thêm thông tin các host đã có
  hosts.forEach((host) => {
    output += `/* configuration information of ${host.label.text} */\n`;
    host.Vulnerbilities.forEach((vuln) => {
      output += `vulExists(${host.label.text}, '${vuln.vulExist.cve}', ${
        vuln.vulExist.service
      }).\nvulProperty(${vuln.vulProp.cve}, ${vuln.vulProp.typeExploit}, ${
        vuln.vulProp.isPrivEscalation ? "privEscalation" : ""
      }).\n`;
    });

    host.Services.forEach((service) => {
      output += `networkServiceInfo(${host.label.text}, ${service.service}, ${
        service.protocol
      }, ..... , ${service.privilege ? "root" : "user"}).\n`;
    });

    host.NSFExportInfo.forEach((nfsExport) => {
      output += `nfsExportInfo(${host.label.text}, '${nfsExport.path}', ${nfsExport.type}, ${nfsExport.fileServer}).\n`;
    });

    host.NSFMounted.forEach((nfsMounted) => {
      output += `nfsMounted(${host.label.text}, '${nfsMounted.localPath}', ${nfsMounted.fileServer}, '${nfsMounted.fileServerPath}', ${nfsMounted.type}).\n`;
    });

    output += "\n";
  });

  console.log(output);

  return output;
};
