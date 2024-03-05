import { io } from 'socket.io-client';
import './App.css';
import { useRef, useState } from 'react';
import Chat from './chat';
import SnackBar from './components/snackBar';



const socket = io.connect("http://localhost:3001")

function JoinRoom() {
  const [show, hide] = useState(false)
  const [username, setUsername] = useState("")
  const handleUsernameChange = (e) =>{
    setUsername(e.target.value)
  }
  const [room, setRoom] = useState("")
  const handleRoomChange = (e) =>{
    setRoom(e.target.value)
  }
  const joinRoom = () =>{
  if ( username !== "" && room !== ""){
    socket.emit("join-room", room)
    // hide(true)
    setTimeout( () => {
      hide(true)
  }, 4000)
  }
  snackBarRef.current.show()
  }
  const SnacBarType = {
    success: "success",
    failed: "failed"
  }
  const snackBarRef = useRef(null)
  return (
    <div className="App">
      {!show ?
      (<div className="joinChatContainer">
        <SnackBar ref={snackBarRef} message={`heyy ${username}, Welcome`} type= {SnacBarType.success}/>
      <h3>join a chat</h3>
      <input type="text" placeholder='type.....' onChange={handleUsernameChange} />
      
      <input type="text" placeholder='room id..' onChange={handleRoomChange} />

      <button onClick={joinRoom}>Join a room</button>
      </div>)
      :
      ( <Chat socket= {socket} username = {username} room = {room} /> )}

    </div>
  );
}

export default JoinRoom;
