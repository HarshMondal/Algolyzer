import type { SortingFrame } from '../types/sorting';

export function mergeSortWithSteps(array: number[]): SortingFrame[] {
  const frames: SortingFrame[] = [];
  const arr = [...array]; // Create a copy to avoid mutating the original
  let comparisonCount = 0;
  let swapCount = 0;

  // Initial frame showing the unsorted array
  frames.push({
    array: [...arr],
    comparedIndices: null,
    swapped: false,
    description: 'Starting Merge Sort',
    comparisonCount: 0,
    swapCount: 0,
  });

  function merge(left: number[], right: number[], startIndex: number): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      comparisonCount++;
      const leftVal = left[leftIndex];
      const rightVal = right[rightIndex];
      const leftPos = startIndex + leftIndex;
      const rightPos = startIndex + left.length + rightIndex;

      // Frame: Comparing elements from two halves
      frames.push({
        array: [...arr],
        comparedIndices: [leftPos, rightPos],
        swapped: false,
        description: `Comparing ${leftVal} and ${rightVal} for merge`,
        comparisonCount,
        swapCount,
      });

      if (left[leftIndex] <= right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    // Add remaining elements
    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      rightIndex++;
    }

    // Update the array with merged result
    for (let i = 0; i < result.length; i++) {
      const oldValue = arr[startIndex + i];
      arr[startIndex + i] = result[i];
      if (oldValue !== result[i]) {
        swapCount++;
      }
    }

    // Frame: After merge
    frames.push({
      array: [...arr],
      comparedIndices: null,
      swapped: false,
      description: `Merged subarray from position ${startIndex}`,
      comparisonCount,
      swapCount,
    });

    return result;
  }

  function mergeSortHelper(start: number, end: number): number[] {
    if (end - start <= 1) {
      return [arr[start]];
    }

    const mid = Math.floor((start + end) / 2);

    // Frame: Dividing array
    frames.push({
      array: [...arr],
      comparedIndices: null,
      swapped: false,
      description: `Dividing array from ${start} to ${end - 1}`,
      comparisonCount,
      swapCount,
    });

    const left = mergeSortHelper(start, mid);
    const right = mergeSortHelper(mid, end);

    return merge(left, right, start);
  }

  mergeSortHelper(0, arr.length);

  // Final frame: All elements sorted
  frames.push({
    array: [...arr],
    comparedIndices: null,
    swapped: false,
    description: 'Sorting complete!',
    comparisonCount,
    swapCount,
  });

  return frames;
}

