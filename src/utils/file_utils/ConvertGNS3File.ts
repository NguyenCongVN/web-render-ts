import { Topology } from "../classes/Topology";
const ConvertGNS3 = (gns3Text: string): Topology => {
  try {
    let jsonContent = JSON.parse(gns3Text);
    let topology = new Topology(jsonContent);
    return topology;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { ConvertGNS3 };
