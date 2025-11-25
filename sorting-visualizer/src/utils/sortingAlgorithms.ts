import type { SortingFrame } from '../types/sorting';
import { bubbleSortWithSteps } from './bubbleSort';
import { insertionSortWithSteps } from './insertionSort';
import { selectionSortWithSteps } from './selectionSort';
import { mergeSortWithSteps } from './mergeSort';
import { quickSortWithSteps } from './quickSort';

export type AlgorithmName = 'Bubble' | 'Insertion' | 'Selection' | 'Merge' | 'Quick';

export type SortingAlgorithmFunction = (array: number[]) => SortingFrame[];

export const algorithmFunctions: Record<AlgorithmName, SortingAlgorithmFunction> = {
  Bubble: bubbleSortWithSteps,
  Insertion: insertionSortWithSteps,
  Selection: selectionSortWithSteps,
  Merge: mergeSortWithSteps,
  Quick: quickSortWithSteps,
};

export function getSortingAlgorithm(name: string): SortingAlgorithmFunction {
  const algorithmName = name as AlgorithmName;
  if (algorithmName in algorithmFunctions) {
    return algorithmFunctions[algorithmName];
  }
  // Default to Bubble Sort if invalid algorithm name
  return algorithmFunctions.Bubble;
}

