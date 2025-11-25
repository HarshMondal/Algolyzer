import { useEffect, useCallback } from 'react';
import Header from '../components/Header';
import MainVisualizer from '../components/MainVisualizer';
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
          onAlgorithmChange={handleAlgorithmChange}
          onPlay={play}
          onPause={pause}
          onReset={handleReset}
          onStepForward={handleStepForward}
          isPlaying={isPlaying}
          isPaused={isPaused}
          speedMultiplier={speedMultiplier}
          onSpeedChange={handleSpeedChange}
        />
      </main>
    </div>
  );
}

export default VisualizerPage;

