import { createBrowserRouter } from 'react-router-dom'
import VisualizerPage from './pages/VisualizerPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <VisualizerPage />,
  },
])

export default router

