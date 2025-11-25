import type { SortingFrame } from '../types/sorting';

export function bubbleSortWithSteps(array: number[]): SortingFrame[] {
  const frames: SortingFrame[] = [];
  const arr = [...array]; // Create a copy to avoid mutating the original
  let comparisonCount = 0;
  let swapCount = 0;

  // Initial frame showing the unsorted array
  frames.push({
    array: [...arr],
    comparedIndices: null,
    swapped: false,
    description: 'Starting Bubble Sort',
    comparisonCount: 0,
    swapCount: 0,
  });

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;

    for (let j = 0; j < n - i - 1; j++) {
      comparisonCount++;
      // Frame: Comparing two elements
      frames.push({
        array: [...arr],
        comparedIndices: [j, j + 1],
        swapped: false,
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        comparisonCount,
        swapCount,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedInPass = true;
        swapCount++;

        // Frame: After swap
        frames.push({
          array: [...arr],
          comparedIndices: [j, j + 1],
          swapped: true,
          description: `Swapped ${arr[j + 1]} and ${arr[j]}`,
          comparisonCount,
          swapCount,
        });
      }
    }

    // Mark the last element as sorted after each pass
    if (!swappedInPass) {
      // Array is already sorted
      frames.push({
        array: [...arr],
        comparedIndices: null,
        swapped: false,
        description: 'Array is sorted',
        comparisonCount,
        swapCount,
      });
      break;
    }
  }

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

