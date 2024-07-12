export type SortingAlgorithmType =
  | "bubble"
  | "insertion"
  | "selection"
  | "quick"
  | "merge";
export type SelectAlgorithmOptionsType = {
  label: string;
  value: SortingAlgorithmType;
};


export type AnimationArrayType = [number[], boolean][];