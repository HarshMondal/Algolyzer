interface ArrayControlsProps {
  arraySize: number;
  onSizeChange: (size: number) => void;
  onGenerate: () => void;
  minSize: number;
  maxSize: number;
}

export default function ArrayControls({
  arraySize,
  onSizeChange,
  onGenerate,
  minSize,
  maxSize,
}: ArrayControlsProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    onSizeChange(newSize);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
      <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
        <label htmlFor="array-size-slider" className="text-sm font-semibold text-gray-300 whitespace-nowrap">
          Array Size: <span className="text-blue-400 font-bold text-lg">{arraySize}</span>
        </label>
        <input
          id="array-size-slider"
          type="range"
          min={minSize}
          max={maxSize}
          value={arraySize}
          onChange={handleSliderChange}
          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((arraySize - minSize) / (maxSize - minSize)) * 100}%, #374151 ${((arraySize - minSize) / (maxSize - minSize)) * 100}%, #374151 100%)`
          }}
          aria-label="Array size slider"
        />
      </div>
      <button
        onClick={onGenerate}
        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50 whitespace-nowrap text-white"
        aria-label="Generate new array"
      >
        🎲 Generate New Array
      </button>
    </div>
  );
}

