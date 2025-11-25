import type { SortingFrame } from '../types/sorting';

interface StatisticsPanelProps {
  currentFrame: SortingFrame | null;
  totalFrames: number;
  currentFrameIndex: number;
}

export default function StatisticsPanel({
  currentFrame,
  totalFrames,
  currentFrameIndex,
}: StatisticsPanelProps) {
  const comparisons = currentFrame?.comparisonCount ?? 0;
  const swaps = currentFrame?.swapCount ?? 0;
  const progress = totalFrames > 0 ? ((currentFrameIndex + 1) / totalFrames) * 100 : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Comparisons</span>
        <span className="text-2xl font-bold text-blue-400 mt-1">{comparisons}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Swaps</span>
        <span className="text-2xl font-bold text-red-400 mt-1">{swaps}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Steps</span>
        <span className="text-2xl font-bold text-gray-300 mt-1">
          {currentFrameIndex + 1}/{totalFrames}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Progress</span>
        <div className="mt-1">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 mt-1">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

