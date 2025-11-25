import type { AlgorithmName } from '../utils/sortingAlgorithms';

interface AlgorithmSelectorProps {
  selectedAlgorithm: AlgorithmName;
  onAlgorithmChange: (algorithm: AlgorithmName) => void;
  disabled?: boolean;
}

const ALGORITHMS: AlgorithmName[] = ['Bubble', 'Insertion', 'Selection', 'Merge', 'Quick'];

export default function AlgorithmSelector({
  selectedAlgorithm,
  onAlgorithmChange,
  disabled = false,
}: AlgorithmSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onAlgorithmChange(e.target.value as AlgorithmName);
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="algorithm-selector" className="text-sm sm:text-base font-semibold text-gray-300 whitespace-nowrap">
        Algorithm:
      </label>
      <select
        id="algorithm-selector"
        value={selectedAlgorithm}
        onChange={handleChange}
        disabled={disabled}
        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed rounded-lg font-semibold text-white text-sm sm:text-base border-2 border-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all cursor-pointer disabled:opacity-50 min-w-[140px] sm:min-w-[180px]"
        aria-label="Select sorting algorithm"
      >
        {ALGORITHMS.map((algorithm) => (
          <option key={algorithm} value={algorithm} className="bg-gray-700">
            {algorithm} Sort
          </option>
        ))}
      </select>
    </div>
  );
}

