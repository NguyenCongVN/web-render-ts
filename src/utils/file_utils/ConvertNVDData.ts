import { RootObjectNVDData } from "../interfaces/cve_data/ICVEData";
const ConvertNVDData = (json: string): string => {
  try {
    let result = "";
    let nvdData = JSON.parse(json) as RootObjectNVDData;
    console.log(nvdData);
    nvdData.CVE_Items.forEach((cve) => {
      let baseMetricV2 = cve.impact.baseMetricV2;
      let metricV2String = "_";
      if (baseMetricV2) {
        metricV2String = `${cve.impact.baseMetricV2.exploitabilityScore},${cve.impact.baseMetricV2.cvssV2.baseScore}`;
      }

      let baseMetricV3 = cve.impact.baseMetricV3;
      let metricV3String = "_";
      if (baseMetricV3) {
        metricV3String = `${cve.impact.baseMetricV3.exploitabilityScore},${cve.impact.baseMetricV3.cvssV3.baseScore}`;
      }
      result += `${cve.cve.CVE_data_meta.ID}|${metricV2String}|${metricV3String}\n`;
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { ConvertNVDData };
