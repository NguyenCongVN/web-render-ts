import { IndividualAttackState } from "../../redux/reducers/AttackProcessReducer";
export const CalculateProcessPercent = (
  attackProcesses: IndividualAttackState[]
): number => {
  let numberAttackProcess = attackProcesses.length;
  let baseScore = 100 / (4 * numberAttackProcess);

  let totalScore = 0;
  attackProcesses.forEach((attackProcess) => {
    if (attackProcess.scanReportId) {
      totalScore += baseScore;
    }

    if (attackProcess.shellNumberGot.length > 0) {
      totalScore += baseScore;
    }

    if (attackProcess.meterpreterGot.length > 0) {
      totalScore += baseScore;
    }
  });

  return totalScore;
};
