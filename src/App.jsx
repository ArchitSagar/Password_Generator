import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [pass,setPass] = useState("")
  const initialText = 'Copy';
  const [buttonText, setButtonText] = useState(initialText);
  const passRef = useRef(null)

  const passGenerator = useCallback(()=> {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (numAllowed) str += "1234567890"
    if (charAllowed) str += "~`!@#$%^&*{}[]+=_-"
    for(let i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPass(pass)

  }, [length,numAllowed,charAllowed,setPass])

  const copyPassToClipborad = useCallback(()=>{
    passRef.current?.select();
    setButtonText('copied');
    setTimeout(() => {
      setButtonText(initialText)
    },1000);
    window.navigator.clipboard.writeText(pass)
  },[pass,buttonText])

  useEffect(()=>{
    passGenerator()
  },[length,numAllowed,charAllowed,passGenerator,])

  return (
    <div className='flex flex-col h-screen w-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] '>
     <div className='w-[95%] max-w-md mx-auto my-auto shadow-md rounded-lg px-4  text-orange-500  text-center bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-white text-center text-xl py-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 h-10'>
          <input 
            type="text"
            value={pass}
            className='outline-none w-full py-1 px-3 '
            placeholder='Password'
            readOnly 
            ref={passRef}
          />
          <button onClick={copyPassToClipborad} className=' bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-white px-3 py-0.5 shrink-0'>{buttonText}</button>
        </div>
        <div className='flex flex-col sm:flex-row  text-m  gap-x-2 pb-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) =>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked = {numAllowed}
              id = "numberInput"
              className='cursor-pointer'
              onChange={()=> {setnumAllowed((prev) => !prev)}}
            />
            <label >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked = {charAllowed}
              id = "characterInput"
              className='cursor-pointer'
              onChange={()=> {setcharAllowed((prev) => !prev)}}
            />
            <label >Character</label>
          </div>

        </div>
      </div> 
    </div>
  )
}

export default App
