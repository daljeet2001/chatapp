import {WebSocketServer,WebSocket} from 'ws'
const wss=new WebSocketServer({port:8080});

interface User{
socket:WebSocket,
room:string,
}

let allsocket:User[]=[]

wss.on('connection',function connection(socket){
   
    socket.on('error',console.error);

    socket.on('message',function message(data){
        const parseData=JSON.parse(data as unknown as string)
        if(parseData.type==="join"){
            allsocket.push({
                socket,
                room:parseData.payload.roomId
            })
        }
        if (parseData.type === 'chat') {
            const currentUser = allsocket.find((x) => x.socket === socket);
            if (!currentUser) return;
      
            for (let i = 0; i < allsocket.length; i++) {
              if (allsocket[i].room === currentUser.room) {
                allsocket[i].socket.send(parseData.payload.message);
              }
            }
          }
    });

    socket.on("disconnect",()=>{
       
    })

    // socket.send("hello");

    console.log('connected');

});