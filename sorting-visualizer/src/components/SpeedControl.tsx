interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SPEED_OPTIONS = [0.25, 0.5, 1, 2];
const SPEED_LABELS = ['0.25x', '0.5x', '1x', '2x'];

export default function SpeedControl({ speed, onSpeedChange }: SpeedControlProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    onSpeedChange(SPEED_OPTIONS[index]);
  };

  const currentIndex = SPEED_OPTIONS.indexOf(speed);
  const currentLabel = SPEED_LABELS[currentIndex] || '1x';

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="speed-slider" className="text-sm font-semibold text-gray-300 whitespace-nowrap">
        Speed: <span className="text-blue-400 font-bold text-lg">{currentLabel}</span>
      </label>
      <input
        id="speed-slider"
        type="range"
        min="0"
        max={SPEED_OPTIONS.length - 1}
        value={currentIndex}
        onChange={handleSliderChange}
        step="1"
        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentIndex / (SPEED_OPTIONS.length - 1)) * 100}%, #374151 ${(currentIndex / (SPEED_OPTIONS.length - 1)) * 100}%, #374151 100%)`
        }}
        aria-label="Animation speed slider"
      />
    </div>
  );
}

