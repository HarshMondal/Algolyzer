import { useState, useCallback } from 'react';
import { generateRandomArray, validateArraySize, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE } from '../utils/arrayUtils';

export function useArrayGenerator(initialSize: number = 50) {
  const [arraySize, setArraySizeState] = useState(initialSize);
  const [currentArray, setCurrentArray] = useState<number[]>(() =>
    generateRandomArray(initialSize)
  );

  const generateNewArray = useCallback(() => {
    setCurrentArray(generateRandomArray(arraySize));
  }, [arraySize]);

  const setArraySize = useCallback((size: number) => {
    if (validateArraySize(size)) {
      setArraySizeState(size);
      setCurrentArray(generateRandomArray(size));
    }
  }, []);

  return {
    arraySize,
    currentArray,
    generateNewArray,
    setArraySize,
    minSize: MIN_ARRAY_SIZE,
    maxSize: MAX_ARRAY_SIZE,
  };
}

