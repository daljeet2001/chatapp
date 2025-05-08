import {useEffect, useState,useRef} from 'react'
function App() {
 const wsRef=useRef();
 const[messages,setMessages]=useState(["hi there"])

 useEffect(()=>{
  const ws=new WebSocket("ws://localhost:8080");
  ws.onmessage=(event)=>{
  setMessages(m=>[...m,event.data])
  }
  wsRef.current=ws;

  ws.onopen=()=>{
    ws.send(JSON.stringify({
      type:"join",
      payload:{
        roomId:"red"
      }
    }))
  }
  return ()=>{
    ws.close()
  }
 },[]) 
  return (
    <>
    <div className="bg-black h-screen">
      <br/><br/><br/>
      <div className="h-[85vh]">
        {messages.map(message=><div className="m-8">
        <span className="bg-white text-black rounded p-4">{message}</span>
        </div>)}
      </div>
      <div className="w-full  flex">
        <input className="p-4 flex-1 bg-white" type="text" placeholder="send messsage" id="message"></input>
        <button onClick={()=>{
          const message=document.getElementById("message")?.value;
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:message
            }
          }))
        }} className="text-white p-4 bg-gray-600 ">Send</button>
      </div>
    </div>
   
   

    </>
  )
}

export default App
