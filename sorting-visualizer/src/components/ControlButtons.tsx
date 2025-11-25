interface ControlButtonsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  hasFrames: boolean;
  canStepForward: boolean;
}

function ControlButtons({
  onPlay,
  onPause,
  onReset,
  onStepForward,
  isPlaying,
  isPaused,
  hasFrames,
  canStepForward,
}: ControlButtonsProps) {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={onPlay}
        disabled={isPlaying || !hasFrames}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 disabled:shadow-none disabled:transform-none flex items-center gap-2"
        aria-label="Play animation"
      >
        <span>▶</span>
        <span>Play</span>
      </button>
      <button
        onClick={onPause}
        disabled={!isPlaying || isPaused}
        className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-yellow-500/50 disabled:shadow-none disabled:transform-none flex items-center gap-2"
        aria-label="Pause animation"
      >
        <span>⏸</span>
        <span>Pause</span>
      </button>
      <button
        onClick={onStepForward}
        disabled={!canStepForward || !hasFrames}
        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50 disabled:shadow-none disabled:transform-none flex items-center gap-2"
        aria-label="Step forward"
      >
        <span>⏭</span>
        <span>Step Forward</span>
      </button>
      <button
        onClick={onReset}
        disabled={!hasFrames}
        className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50 disabled:shadow-none disabled:transform-none flex items-center gap-2"
        aria-label="Reset animation"
      >
        <span>⏹</span>
        <span>Reset</span>
      </button>
    </div>
  );
}

export default ControlButtons;

