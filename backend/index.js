import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import auth from './routes/authRoute.js'
import { userRouter } from './routes/userRoute.js';
import { msgRouter } from './routes/messageRoute.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 9000;


app.use(express.json());


app.use('/api/v1/auth',auth)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/message',msgRouter)


io.on("connection", (socket) => {
    socket.on('message',(msg)=>{
        const {from,to,message} = JSON.parse(msg);
        try{
            prisma.message.create({
                data:{
                    from,
                    to,
                    message
                }
            })
            socket.broadcast.emit(to, message);  
        }
        catch(e){
            console.log("Message compromised");
        }
    })
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
