import { bubbleSortAnimation } from "@/algo/bubbleSort";
import { AnimationArrayType, SortingAlgorithmType } from "./types";

export const MIN_ANIMATION_SPEED = 100;
export const MAX_ANIMATION_SPEED = 400;

//generate random number

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//sorting algorithms
export const algorithmsOptions = [
  { value: "bubble", label: "Bubble Sort" },
  { value: "insertion", label: "Insertion Sort" },
  { value: "selection", label: "Selection Sort" },
  { value: "quick", label: "Quick Sort" },
  { value: "merge", label: "Merge Sort" },
];

export function generateAlgorithmAnimation(
  selectedAlgorithm: SortingAlgorithmType,
  isSorting: boolean,
  array: number[],
  startAnimation: (animation: AnimationArrayType) => void
) {
  switch (selectedAlgorithm) {
    case "bubble":
      bubbleSortAnimation(isSorting, array, startAnimation);
      break;

    default:
      break;
  }
}
