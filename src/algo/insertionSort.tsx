import { AnimationArrayType } from "@/lib/types";

function runInsertionSort(array: number[], animations: AnimationArrayType) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    animations.push([[i, key], false]);
    while (j >= 0 && array[j] > key) {
      animations.push([[j + 1, array[j]], true]);
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
}

export function insertionSortAnimation(
  isSorting: boolean,
  array: number[],
  startAnimation: (animation: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return;

  const animations: AnimationArrayType = [];
  const copyArray = array.slice();

  runInsertionSort(copyArray, animations);
  startAnimation(animations);
}
