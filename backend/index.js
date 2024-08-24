import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import auth from './routes/authRoute.js'
import { userRouter } from './routes/userRoute.js';
import { msgRouter } from './routes/messageRoute.js';
import { prisma } from './db/db.js';
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 9000;
const JWT_PASS = process.env.JWT_PASS

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  }));

app.use('/api/v1/auth',auth)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/message',msgRouter)


io.on("connection", (socket) => {
    socket.on('message',async (msg)=>{
        const {from,to,message,token} = JSON.parse(msg);
        try {
            jwt.verify(token,JWT_PASS)
            const decoded = jwt.decode(token);
            if(from != decoded.username){
                throw new Error("Token match error")
            }
            
            const time = new Date();
            await prisma.message.create({
                data:{
                    from,
                    to,
                    message,
                    sentTime: new Date(time)
                }
            })
            const newMsg = {
                from:from,
                to:to,
                message,
                sentTime: time
            }
            socket.broadcast.emit(to,newMsg);  
        }
        catch(e){
            console.log(e)
            console.log("Message compromised");
        }
    })
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
