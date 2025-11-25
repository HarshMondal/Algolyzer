import type { SortingFrame } from '../types/sorting';

export function selectionSortWithSteps(array: number[]): SortingFrame[] {
  const frames: SortingFrame[] = [];
  const arr = [...array]; // Create a copy to avoid mutating the original
  let comparisonCount = 0;
  let swapCount = 0;

  // Initial frame showing the unsorted array
  frames.push({
    array: [...arr],
    comparedIndices: null,
    swapped: false,
    description: 'Starting Selection Sort',
    comparisonCount: 0,
    swapCount: 0,
  });

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Frame: Starting new pass, finding minimum
    frames.push({
      array: [...arr],
      comparedIndices: [i],
      swapped: false,
      description: `Finding minimum from position ${i}`,
      comparisonCount,
      swapCount,
    });

    // Find the minimum element in remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      comparisonCount++;
      // Frame: Comparing with current minimum
      frames.push({
        array: [...arr],
        comparedIndices: [minIndex, j],
        swapped: false,
        description: `Comparing ${arr[minIndex]} with ${arr[j]}`,
        comparisonCount,
        swapCount,
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        // Frame: New minimum found
        frames.push({
          array: [...arr],
          comparedIndices: [minIndex],
          swapped: false,
          description: `New minimum found: ${arr[minIndex]}`,
          comparisonCount,
          swapCount,
        });
      }
    }

    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      swapCount++;
      
      // Frame: After swap
      frames.push({
        array: [...arr],
        comparedIndices: [i, minIndex],
        swapped: true,
        description: `Swapped ${arr[i]} with ${arr[minIndex]}`,
        comparisonCount,
        swapCount,
      });
    } else {
      // Frame: Element already in correct position
      frames.push({
        array: [...arr],
        comparedIndices: [i],
        swapped: false,
        description: `Element ${arr[i]} already in correct position`,
        comparisonCount,
        swapCount,
      });
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

