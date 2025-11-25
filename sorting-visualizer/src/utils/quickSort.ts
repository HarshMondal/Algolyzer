import type { SortingFrame } from '../types/sorting';

export function quickSortWithSteps(array: number[]): SortingFrame[] {
  const frames: SortingFrame[] = [];
  const arr = [...array]; // Create a copy to avoid mutating the original
  let comparisonCount = 0;
  let swapCount = 0;

  // Initial frame showing the unsorted array
  frames.push({
    array: [...arr],
    comparedIndices: null,
    swapped: false,
    description: 'Starting Quick Sort',
    comparisonCount: 0,
    swapCount: 0,
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    // Frame: Starting partition with pivot
    frames.push({
      array: [...arr],
      comparedIndices: [high],
      swapped: false,
      description: `Partitioning with pivot ${pivot} (position ${high})`,
      comparisonCount,
      swapCount,
    });

    for (let j = low; j < high; j++) {
      comparisonCount++;
      // Frame: Comparing with pivot
      frames.push({
        array: [...arr],
        comparedIndices: [j, high],
        swapped: false,
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
        comparisonCount,
        swapCount,
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swapCount++;
          
          // Frame: Swapping elements
          frames.push({
            array: [...arr],
            comparedIndices: [i, j],
            swapped: true,
            description: `Swapped ${arr[i]} and ${arr[j]}`,
            comparisonCount,
            swapCount,
          });
        }
      }
    }

    // Place pivot in correct position
    if (i + 1 !== high) {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swapCount++;
      
      // Frame: Placing pivot in final position
      frames.push({
        array: [...arr],
        comparedIndices: [i + 1, high],
        swapped: true,
        description: `Placed pivot ${pivot} at position ${i + 1}`,
        comparisonCount,
        swapCount,
      });
    }

    return i + 1;
  }

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      // Frame: Starting quicksort on subarray
      frames.push({
        array: [...arr],
        comparedIndices: null,
        swapped: false,
        description: `Sorting subarray from ${low} to ${high}`,
        comparisonCount,
        swapCount,
      });

      const pivotIndex = partition(low, high);

      // Recursively sort elements before and after partition
      quickSortHelper(low, pivotIndex - 1);
      quickSortHelper(pivotIndex + 1, high);
    }
  }

  if (arr.length > 0) {
    quickSortHelper(0, arr.length - 1);
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

