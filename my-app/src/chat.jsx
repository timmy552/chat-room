import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
import {useSpeechSynthesis} from 'react-speech-kit'
import { AiFillAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";
<AiOutlineAudioMuted />


const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] =useState("")
    const [messageList, setMessageList] =useState([])
    const handleMessageChange= (e) =>{
        setCurrentMessage(e.target.value)
    }

    const sendMessage = async () =>{
        if (currentMessage !== ""){
         const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
         };
         
         await socket.emit("send-message", messageData)
         setMessageList((list) => [...list, messageData])
         setCurrentMessage("")
        }
        
    }
    
    
    const {speak} = useSpeechSynthesis()
    const speechToText = () =>{
        speak({text: currentMessage})
      }
    
    //  useEffect(() => {
    //   socket.on("receive-message", (data) =>{
    //   setMessageList((list) => [...list, data])
    //   console.log(data)
    //   })  
    //  }, [socket])

     useEffect(() => {
        socket.off("receive-message").on("receive-message", (data) => {
    
          setMessageList((list) => [...list, data]);
        });
      }, [socket])
  return (
    <div className='chat-window'>
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div  className="chat-body">
            <ScrollToBottom className= "message-container">
            {messageList.map((messageContent) => {
               return  <div className="message" id={username === messageContent.author ? "you" : "other"}>
                <div>
                    <div className="message-content">
                     <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                     <p id='time'>{messageContent.time}</p>
                     <p id='author'>{messageContent.author}</p>
                    </div>
                </div>
               </div>
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" value={currentMessage} placeholder='your text here....' onChange={handleMessageChange} onKeyPress={(e) => {
                e.key === "Enter" && sendMessage()
            }}/>
            <button onClick={sendMessage}>&#9658;</button>
           <button> {currentMessage !== "" ? <p onClick={speechToText}><AiFillAudio /></p> : <p><AiOutlineAudioMuted /></p>}</button>
        </div>
    </div>
  )
}

export default Chat