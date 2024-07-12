import { AnimationArrayType } from "@/lib/types";
import { start } from "node:repl";
import { run } from "node:test";

function runBubbleSort(array: number[], animations: AnimationArrayType) {
  for (let passIndex = 0; passIndex < array.length; passIndex++) {
    for (
      let compareIndex = 0;
      compareIndex < array.length - passIndex - 1;
      compareIndex++
    ) {
      animations.push([[compareIndex, compareIndex + 1], false]);
      if (array[compareIndex] > array[compareIndex + 1]) {
        animations.push([[compareIndex, array[compareIndex + 1]], true]);
        animations.push([[compareIndex + 1, array[compareIndex]], true]);
        [array[compareIndex], array[compareIndex + 1]] = [
          array[compareIndex + 1],
          array[compareIndex],
        ];
      }
    }
  }
}

export function bubbleSortAnimation(
  isSorting: boolean,
  array: number[],
  startAnimation: (animation: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return;

  const animations: AnimationArrayType = [];
  const copyArray = array.slice();

  runBubbleSort(copyArray, animations);
  startAnimation(animations);
}
