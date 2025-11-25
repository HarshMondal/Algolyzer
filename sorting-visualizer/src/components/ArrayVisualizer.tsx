import { useMemo } from 'react';
import BarVisualization from './BarVisualization';
import type { SortingFrame } from '../types/sorting';

interface ArrayVisualizerProps {
  array: number[];
  highlightedIndices: number[];
  currentFrame: SortingFrame | null;
}

export default function ArrayVisualizer({
  array,
  highlightedIndices,
  currentFrame,
}: ArrayVisualizerProps) {
  const maxValue = useMemo(() => {
    return array.length > 0 ? Math.max(...array) : 1;
  }, [array]);

  const isFullySorted = useMemo(() => {
    if (!currentFrame) return false;
    return currentFrame.description === 'Sorting complete!';
  }, [currentFrame]);

  // Determine which bars are sorted (all bars when fully sorted)
  const sortedIndices = useMemo(() => {
    if (isFullySorted) {
      return array.map((_, i) => i);
    }
    return [];
  }, [isFullySorted, array.length]);

  return (
    <div className="w-full h-full flex items-end justify-center gap-0.5 sm:gap-1 px-2 pb-3">
      {array.map((value, index) => {
        const isHighlighted = highlightedIndices.includes(index);
        const isCompared =
          currentFrame?.comparedIndices?.includes(index) ?? false;
        const isSwapped =
          currentFrame?.swapped &&
          currentFrame?.comparedIndices?.includes(index);
        const isSorted = sortedIndices.includes(index) && !isCompared && !isSwapped;

        return (
          <BarVisualization
            key={`${index}-${value}`}
            value={value}
            maxValue={maxValue}
            isHighlighted={isHighlighted}
            isCompared={isCompared}
            isSwapped={isSwapped}
            isSorted={isSorted}
          />
        );
      })}
    </div>
  );
}

