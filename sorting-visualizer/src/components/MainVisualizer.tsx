import ArrayVisualizer from './ArrayVisualizer';
import ArrayControls from './ArrayControls';
import StatisticsPanel from './StatisticsPanel';
import AlgorithmSelector from './AlgorithmSelector';
import ControlButtons from './ControlButtons';
import SpeedControl from './SpeedControl';
import type { SortingFrame } from '../types/sorting';
import type { AlgorithmName } from '../utils/sortingAlgorithms';

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
  selectedAlgorithm: AlgorithmName;
  onAlgorithmChange: (algorithm: AlgorithmName) => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  speedMultiplier: number;
  onSpeedChange: (speed: number) => void;
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
  selectedAlgorithm,
  onAlgorithmChange,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  isPlaying,
  isPaused,
  speedMultiplier,
  onSpeedChange,
}: MainVisualizerProps) {
  return (
    <div className="w-full h-full max-w-7xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700 shadow-2xl flex flex-col p-4 sm:p-6 gap-4">
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center">{selectedAlgorithm} Sort</h2>
        
        {/* Primary Controls - Algorithm and Playback */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-3 lg:gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
          <div className="flex-shrink-0">
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={onAlgorithmChange}
              disabled={isPlaying}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <ControlButtons
              onPlay={onPlay}
              onPause={onPause}
              onReset={onReset}
              onStepForward={onStepForward}
              isPlaying={isPlaying}
              isPaused={isPaused}
              hasFrames={array.length > 0 && totalFrames > 0}
              canStepForward={currentFrameIndex < totalFrames - 1}
            />
          </div>
        </div>

        {/* Secondary Controls - Array Size and Speed */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
          <ArrayControls
            arraySize={arraySize}
            onSizeChange={onSizeChange}
            onGenerate={onGenerate}
            minSize={minSize}
            maxSize={maxSize}
          />
          <SpeedControl
            speed={speedMultiplier}
            onSpeedChange={onSpeedChange}
          />
        </div>
      </div>
      
      {array.length > 0 ? (
        <ArrayVisualizer
          array={array}
          highlightedIndices={highlightedIndices}
          currentFrame={currentFrame}
        />
      ) : (
        <div className="flex-1 min-h-[500px] flex items-center justify-center">
          <p className="text-xl text-gray-400">Generate an array to start visualizing</p>
        </div>
      )}

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

