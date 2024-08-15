import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Users should login to the website
// they will have user_id through that we emit msg
// POST : Register / Login -> Take digital phone number
// POST : Give Contacts based on digitalPhoneNumbers available 
// POST : message : emit message to required person
// thats all


io.on("connection", (socket) => {
    console.log("User connected having id:" + socket.id);
});

server.listen(9000, () => {
    console.log(`Server is running on port ${PORT}`);
});
