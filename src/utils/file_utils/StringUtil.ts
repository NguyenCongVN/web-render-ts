import clone from "clone";
export const convertLabel = (label: string): string => {
  return clone(label).replaceAll("-", "").toLowerCase();
};
