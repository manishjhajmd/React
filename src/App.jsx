import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Qrcode from './component/QRcode'
import Todo from './component/todo'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Todo/>
   <Qrcode/>
   </>
  )
}

export default App
