enum SortingAlgorithm {
  BUBBLE = "bubble",
  SELECTION = "selection",
  INSERTION = "insertion",
  MERGE = "merge",
  QUICK = "quick",
}

export type SortingAlgorithmType = keyof typeof SortingAlgorithm;
