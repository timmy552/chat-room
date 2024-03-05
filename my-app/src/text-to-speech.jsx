import React from 'react'
import { useState } from 'react'
import {useSpeechSynthesis} from 'react-speech-kit'
import { useNavigate } from 'react-router-dom'

const TextToSpeech = () => {
  const [text, setText] = useState()
  const handleText = (e) =>{
    setText(e.target.value)
  }

  const {speak} = useSpeechSynthesis()

  const button = () =>{
    speak({text: text})
  }
  const navigate = useNavigate()
  const chat = () =>{
    navigate("/chat")
  }
  return (
    <div>
  <h1> convert text to speech</h1>
  <input type="text" onChange={handleText} />
  <button onClick={button}>Talk</button>

  <br />
  <br />
  <button onClick={chat}>Go To Chats</button>
    </div>
  )
}

export default TextToSpeech