# E-Learn - Sorting Algorithm Visualizer

An interactive web application for visualizing sorting algorithms, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Clean and intuitive interface built with Tailwind CSS
- **Interactive Controls**: Play, Pause, and Reset buttons for controlling algorithm visualization
- **Responsive Design**: Works seamlessly across different screen sizes
- **Component-Based Architecture**: Well-organized codebase with reusable components

## 📁 Project Structure

```
SortViz/
├── sorting-visualizer/          # Main application directory
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Header.tsx       # Application header with title
│   │   │   ├── MainVisualizer.tsx  # Main visualization area
│   │   │   └── ControlButtons.tsx   # Play/Pause/Reset controls
│   │   ├── pages/               # Page components
│   │   │   └── VisualizerPage.tsx   # Main visualizer page
│   │   ├── routes.tsx           # Application routes
│   │   ├── App.tsx              # Root component
│   │   └── main.tsx             # Application entry point
│   ├── public/                  # Static assets
│   └── package.json             # Dependencies and scripts
└── README.md                    # This file
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 📦 Installation

1. Navigate to the project directory:
```bash
cd sorting-visualizer
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

### Header
Displays the "E-Learn" project title at the top of the application.

### Main Visualizer
The central area where sorting algorithm visualizations will be displayed (currently shows placeholder text).

### Control Buttons
- **Play**: Start the sorting algorithm visualization
- **Pause**: Pause the current visualization
- **Reset**: Reset the visualization to initial state

*Note: Button functionality is currently in development*

## 🔮 Future Enhancements

- Implement sorting algorithm visualizations (Bubble Sort, Quick Sort, Merge Sort, etc.)
- Add algorithm selection dropdown
- Speed control slider
- Array size customization
- Step-by-step algorithm explanation
- Multiple algorithm comparison view

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

This project uses:
- **ES Modules** for modern JavaScript
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Router** for navigation (ready for multiple pages)

---

Built with ❤️ using React and TypeScript

