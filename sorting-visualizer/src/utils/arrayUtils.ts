export const MIN_ARRAY_SIZE = 10;
export const MAX_ARRAY_SIZE = 100;
export const MIN_VALUE = 1;
export const MAX_VALUE = 20;

export function validateArraySize(size: number): boolean {
  return size >= MIN_ARRAY_SIZE && size <= MAX_ARRAY_SIZE;
}

export function generateRandomArray(
  size: number,
  min: number = MIN_VALUE,
  max: number = MAX_VALUE
): number[] {
  if (!validateArraySize(size)) {
    throw new Error(
      `Array size must be between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}`
    );
  }

  return Array.from({ length: size }, () => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });
}

