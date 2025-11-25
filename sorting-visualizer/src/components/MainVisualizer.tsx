import ArrayVisualizer from './ArrayVisualizer';
import ArrayControls from './ArrayControls';
import StatisticsPanel from './StatisticsPanel';
import type { SortingFrame } from '../types/sorting';

interface MainVisualizerProps {
  array: number[];
  highlightedIndices: number[];
  currentFrame: SortingFrame | null;
  arraySize: number;
  onSizeChange: (size: number) => void;
  onGenerate: () => void;
  minSize: number;
  maxSize: number;
  totalFrames: number;
  currentFrameIndex: number;
}

function MainVisualizer({
  array,
  highlightedIndices,
  currentFrame,
  arraySize,
  onSizeChange,
  onGenerate,
  minSize,
  maxSize,
  totalFrames,
  currentFrameIndex,
}: MainVisualizerProps) {
  return (
    <div className="w-full h-full max-w-7xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700 shadow-2xl flex flex-col p-4 sm:p-6 gap-4">
      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center">Bubble Sort Visualizer</h2>
        <ArrayControls
          arraySize={arraySize}
          onSizeChange={onSizeChange}
          onGenerate={onGenerate}
          minSize={minSize}
          maxSize={maxSize}
        />
      </div>
      
      <div className="flex-1 min-h-[500px] bg-gray-900 rounded-lg border-2 border-gray-700 shadow-inner overflow-hidden flex flex-col">
        {array.length > 0 ? (
          <div className="flex-1 flex">
            <ArrayVisualizer
              array={array}
              highlightedIndices={highlightedIndices}
              currentFrame={currentFrame}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl text-gray-400">Generate an array to start visualizing</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <StatisticsPanel
          currentFrame={currentFrame}
          totalFrames={totalFrames}
          currentFrameIndex={currentFrameIndex}
        />
        {currentFrame && (
          <div className="text-center text-sm sm:text-base font-medium text-gray-300 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-2 sm:p-3 border border-gray-600">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              {currentFrame.description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainVisualizer;

