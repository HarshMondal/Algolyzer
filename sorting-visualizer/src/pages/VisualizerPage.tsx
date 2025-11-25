import Header from '../components/Header'
import MainVisualizer from '../components/MainVisualizer'
import ControlButtons from '../components/ControlButtons'

function VisualizerPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <MainVisualizer />
      </main>

      <footer className="bg-gray-800 px-6 py-4 shadow-lg">
        <ControlButtons />
      </footer>
    </div>
  )
}

export default VisualizerPage

