import { useEffect, useCallback } from 'react';
import Header from '../components/Header';
import MainVisualizer from '../components/MainVisualizer';
import ControlButtons from '../components/ControlButtons';
import AlgorithmSelector from '../components/AlgorithmSelector';
import SpeedControl from '../components/SpeedControl';
import { useArrayGenerator } from '../hooks/useArrayGenerator';
import { useSortingVisualizer } from '../hooks/useSortingVisualizer';
import { useAnimation } from '../hooks/useAnimation';
import type { AlgorithmName } from '../utils/sortingAlgorithms';

function VisualizerPage() {
  const {
    arraySize,
    currentArray: generatedArray,
    generateNewArray,
    setArraySize,
    minSize,
    maxSize,
  } = useArrayGenerator(50);

  const {
    currentArray,
    frames,
    currentFrameIndex,
    highlightedIndices,
    currentFrame,
    selectedAlgorithm,
    generateFrames,
    resetToOriginal,
    setCurrentFrame,
    setAlgorithm,
  } = useSortingVisualizer();

  // Animation tick handler
  const handleAnimationTick = useCallback(() => {
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrame(currentFrameIndex + 1);
    }
  }, [currentFrameIndex, frames.length, setCurrentFrame]);

  const {
    isPlaying,
    isPaused,
    speedMultiplier,
    play,
    pause,
    reset: resetAnimation,
    stepForward,
    setSpeed,
  } = useAnimation(handleAnimationTick, frames.length, currentFrameIndex);

  // Generate frames when array is generated
  useEffect(() => {
    if (generatedArray.length > 0) {
      generateFrames(generatedArray);
    }
  }, [generatedArray, generateFrames]);

  // Regenerate frames when algorithm changes (if array exists)
  useEffect(() => {
    if (generatedArray.length > 0) {
      generateFrames(generatedArray);
      resetAnimation();
    }
  }, [selectedAlgorithm, generatedArray, generateFrames, resetAnimation]);

  // Handle reset button
  const handleReset = useCallback(() => {
    resetAnimation();
    resetToOriginal();
  }, [resetAnimation, resetToOriginal]);

  // Handle array generation
  const handleGenerate = useCallback(() => {
    resetAnimation();
    generateNewArray();
  }, [resetAnimation, generateNewArray]);

  // Handle algorithm change
  const handleAlgorithmChange = useCallback((algorithm: string) => {
    setAlgorithm(algorithm as AlgorithmName);
  }, [setAlgorithm]);

  // Handle step forward
  const handleStepForward = useCallback(() => {
    if (currentFrameIndex < frames.length - 1) {
      stepForward();
    }
  }, [currentFrameIndex, frames.length, stepForward]);

  // Handle speed change
  const handleSpeedChange = useCallback((speed: number) => {
    setSpeed(speed);
  }, [setSpeed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <MainVisualizer
          array={currentArray}
          highlightedIndices={highlightedIndices}
          currentFrame={currentFrame}
          arraySize={arraySize}
          onSizeChange={setArraySize}
          onGenerate={handleGenerate}
          minSize={minSize}
          maxSize={maxSize}
          totalFrames={frames.length}
          currentFrameIndex={currentFrameIndex}
          selectedAlgorithm={selectedAlgorithm}
        />
      </main>

      <footer className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-900 px-6 py-5 shadow-xl border-t border-gray-700">
        <div className="flex flex-col gap-4 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={handleAlgorithmChange}
              disabled={isPlaying}
            />
            <SpeedControl
              speed={speedMultiplier}
              onSpeedChange={handleSpeedChange}
            />
          </div>
          <ControlButtons
            onPlay={play}
            onPause={pause}
            onReset={handleReset}
            onStepForward={handleStepForward}
            isPlaying={isPlaying}
            isPaused={isPaused}
            hasFrames={frames.length > 0}
            canStepForward={currentFrameIndex < frames.length - 1}
          />
        </div>
      </footer>
    </div>
  );
}

export default VisualizerPage;

