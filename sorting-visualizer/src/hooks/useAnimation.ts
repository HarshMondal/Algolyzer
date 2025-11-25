import { useState, useRef, useCallback, useEffect } from 'react';

const BASE_DELAY = 100; // milliseconds per frame at 1x speed
const DEFAULT_SPEED_MULTIPLIER = 1; // 1x speed

export function useAnimation(
  onTick: () => void,
  totalFrames: number,
  currentFrameIndex: number
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(DEFAULT_SPEED_MULTIPLIER);
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

  const stepForward = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      setIsPaused(true);
    }
    onTickRef.current();
  }, [isPlaying]);

  // Calculate actual delay based on speed multiplier
  const actualDelay = BASE_DELAY / speedMultiplier;

  // Animation loop
  useEffect(() => {
    if (isPlaying && !isPaused) {
      intervalIdRef.current = setInterval(() => {
        onTickRef.current();
      }, actualDelay);
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
  }, [isPlaying, isPaused, actualDelay]);

  // Auto-pause when reaching the end
  useEffect(() => {
    if (isPlaying && totalFrames > 0 && currentFrameIndex >= totalFrames - 1) {
      setIsPlaying(false);
    }
  }, [currentFrameIndex, totalFrames, isPlaying]);

  return {
    isPlaying,
    isPaused,
    speedMultiplier,
    play,
    pause,
    reset,
    stepForward,
    setSpeed: setSpeedMultiplier,
  };
}

