export interface SortingFrame {
  array: number[];
  comparedIndices: [number, number] | null;
  swapped: boolean;
  description: string;
  comparisonCount?: number;
  swapCount?: number;
}

export interface SortingState {
  frames: SortingFrame[];
  currentFrameIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface SortingStatistics {
  comparisons: number;
  swaps: number;
  totalSteps: number;
}

