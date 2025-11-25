import { type SortingFrame } from '../types/sorting';

export function insertionSortWithSteps(array: number[]): SortingFrame[] {
  const frames: SortingFrame[] = [];
  const arr = [...array]; // Create a copy to avoid mutating the original
  let comparisonCount = 0;
  let swapCount = 0;

  // Initial frame showing the unsorted array
  frames.push({
    array: [...arr],
    comparedIndices: null,
    swapped: false,
    description: 'Starting Insertion Sort',
    comparisonCount: 0,
    swapCount: 0,
  } as SortingFrame);

  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Frame: Starting to insert current element
    frames.push({
      array: [...arr],
      comparedIndices: [i, j],
      swapped: false,
      description: `Inserting ${key} into sorted portion`,
      comparisonCount,
      swapCount,
    } as SortingFrame);

    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      comparisonCount++;
      // Frame: Comparing with element in sorted portion
      frames.push({
        array: [...arr],
        comparedIndices: [j, j + 1],
        swapped: false,
        description: `Comparing ${arr[j]} with ${key}`,
        comparisonCount,
        swapCount,
      } as SortingFrame);

      // Shift element to the right
      arr[j + 1] = arr[j];
      swapCount++;
      
      // Frame: Shifting element
      frames.push({
        array: [...arr],
        comparedIndices: [j, j + 1],
        swapped: true,
        description: `Shifting ${arr[j + 1]} to the right`,
        comparisonCount,
        swapCount,
      } as SortingFrame);

      j--;
    }

    // Insert key at correct position
    if (arr[j + 1] !== key) {
      arr[j + 1] = key;
      swapCount++;
      
      // Frame: Inserted key at correct position
      frames.push({
        array: [...arr],
        comparedIndices: [j + 1, i],
        swapped: true,
        description: `Inserted ${key} at position ${j + 1}`,
        comparisonCount,
        swapCount,
      } as SortingFrame);
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
  } as SortingFrame);

  return frames;
}

