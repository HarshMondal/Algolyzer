import { useEffect, useCallback } from 'react';
import Header from '../components/Header';
import MainVisualizer from '../components/MainVisualizer';
import ControlButtons from '../components/ControlButtons';
import { useArrayGenerator } from '../hooks/useArrayGenerator';
import { useSortingVisualizer } from '../hooks/useSortingVisualizer';
import { useAnimation } from '../hooks/useAnimation';

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
    generateFrames,
    resetToOriginal,
    setCurrentFrame,
  } = useSortingVisualizer();

  // Generate frames when array is generated
  useEffect(() => {
    if (generatedArray.length > 0) {
      generateFrames(generatedArray);
    }
  }, [generatedArray, generateFrames]);

  // Animation tick handler
  const handleAnimationTick = useCallback(() => {
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrame(currentFrameIndex + 1);
    }
  }, [currentFrameIndex, frames.length, setCurrentFrame]);

  const {
    isPlaying,
    isPaused,
    play,
    pause,
    reset: resetAnimation,
  } = useAnimation(handleAnimationTick, frames.length, currentFrameIndex);

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
        />
      </main>

      <footer className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-900 px-6 py-5 shadow-xl border-t border-gray-700">
        <ControlButtons
          onPlay={play}
          onPause={pause}
          onReset={handleReset}
          isPlaying={isPlaying}
          isPaused={isPaused}
          hasFrames={frames.length > 0}
        />
      </footer>
    </div>
  );
}

export default VisualizerPage;

