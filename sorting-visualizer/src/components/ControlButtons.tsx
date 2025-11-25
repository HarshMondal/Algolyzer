function ControlButtons() {
  return (
    <div className="flex justify-center gap-4">
      <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
        Play
      </button>
      <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold transition-colors">
        Pause
      </button>
      <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
        Reset
      </button>
    </div>
  )
}

export default ControlButtons

