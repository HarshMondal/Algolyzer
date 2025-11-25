import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULT_SPEED = 100; // milliseconds per frame

export function useAnimation(
  onTick: () => void,
  totalFrames: number,
  currentFrameIndex: number
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_SPEED);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const onTickRef = useRef(onTick);

  // Keep the callback ref up to date
  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  const play = useCallback(() => {
    if (currentFrameIndex >= totalFrames - 1) {
      // Already at the end, reset first
      return;
    }
    setIsPlaying(true);
    setIsPaused(false);
  }, [currentFrameIndex, totalFrames]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(true);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  // Animation loop
  useEffect(() => {
    if (isPlaying && !isPaused) {
      intervalIdRef.current = setInterval(() => {
        onTickRef.current();
      }, animationSpeed);
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isPlaying, isPaused, animationSpeed]);

  // Auto-pause when reaching the end
  useEffect(() => {
    if (isPlaying && totalFrames > 0 && currentFrameIndex >= totalFrames - 1) {
      setIsPlaying(false);
    }
  }, [currentFrameIndex, totalFrames, isPlaying]);

  return {
    isPlaying,
    isPaused,
    animationSpeed,
    play,
    pause,
    reset,
    setSpeed: setAnimationSpeed,
  };
}

