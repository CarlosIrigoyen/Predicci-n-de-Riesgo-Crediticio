import { useState } from 'react'
import Form from './Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='border-2 border-red-500'>
        {/* <h1>Hola mundo</h1> */}
        <Form />
      </div>  
    </>
  )
}

export default App
