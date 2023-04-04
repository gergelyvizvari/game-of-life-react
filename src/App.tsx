import { useState } from 'react'
import GameOfLife from './GameOfLife'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <GameOfLife />
    </div>
  )
}

export default App
