import { useState, useCallback, useMemo, useEffect } from 'react';
import type { SortingFrame } from '../types/sorting';
import { getSortingAlgorithm, type AlgorithmName } from '../utils/sortingAlgorithms';

export function useSortingVisualizer() {
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [frames, setFrames] = useState<SortingFrame[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmName>('Bubble');

  const highlightedIndices = useMemo(() => {
    if (frames.length === 0 || currentFrameIndex >= frames.length) {
      return [];
    }
    const frame = frames[currentFrameIndex];
    return frame.comparedIndices ? [...frame.comparedIndices] : [];
  }, [frames, currentFrameIndex]);

  const generateFrames = useCallback((array: number[]) => {
    const algorithmFunction = getSortingAlgorithm(selectedAlgorithm);
    const newFrames = algorithmFunction(array);
    setOriginalArray([...array]);
    setCurrentArray([...array]);
    setFrames(newFrames);
    setCurrentFrameIndex(0);
  }, [selectedAlgorithm]);

  const setAlgorithm = useCallback((algorithm: AlgorithmName) => {
    setSelectedAlgorithm(algorithm);
  }, []);

  const resetToOriginal = useCallback(() => {
    if (originalArray.length > 0) {
      setCurrentArray([...originalArray]);
      setCurrentFrameIndex(0);
    }
  }, [originalArray]);

  const setCurrentFrame = useCallback(
    (index: number) => {
      if (index >= 0 && index < frames.length) {
        setCurrentFrameIndex(index);
        setCurrentArray([...frames[index].array]);
      }
    },
    [frames]
  );

  // Update currentArray when currentFrameIndex changes and play sounds
  useEffect(() => {
    if (frames.length > 0 && currentFrameIndex < frames.length) {
      const frame = frames[currentFrameIndex];
      setCurrentArray([...frame.array]);
      
      // Play sound effects
      if (currentFrameIndex > 0) {
        if (frame.swapped) {
          import('../utils/soundUtils').then(({ soundManager }) => {
            soundManager.playSwapSound();
          });
        } else if (frame.comparedIndices) {
          import('../utils/soundUtils').then(({ soundManager }) => {
            soundManager.playComparisonSound();
          });
        }
      }
    }
  }, [currentFrameIndex, frames]);

  // Play completion sound when sorting is complete
  useEffect(() => {
    if (frames.length > 0 && currentFrameIndex === frames.length - 1) {
      const frame = frames[currentFrameIndex];
      if (frame.description === 'Sorting complete!') {
        import('../utils/soundUtils').then(({ soundManager }) => {
          soundManager.playCompleteSound();
        });
      }
    }
  }, [currentFrameIndex, frames]);

  const currentFrame = useMemo(() => {
    if (frames.length === 0 || currentFrameIndex >= frames.length) {
      return null;
    }
    return frames[currentFrameIndex];
  }, [frames, currentFrameIndex]);

  return {
    originalArray,
    currentArray,
    frames,
    currentFrameIndex,
    highlightedIndices,
    currentFrame,
    selectedAlgorithm,
    generateFrames,
    resetToOriginal,
    setCurrentFrame,
    setCurrentArray,
    setAlgorithm,
  };
}

