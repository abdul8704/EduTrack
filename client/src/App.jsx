import { useState } from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'


function AppContent() {
  return (
    <>
      <Routes>

      </Routes>
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
