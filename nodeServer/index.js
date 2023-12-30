//Node server which will handle socket io connections

const express= require("express");
const app= express();
const cors= require("cors");
const http= require("http").createServer(app);

 
const io= require('socket.io')(http, {
    cors: {
        origin: "*",
        credentials: true,
    }
 });
  
const users= {};

io.on('connection', socket =>{
    socket.on('New-user-joined', name =>{
        console.log("New user", name)
        users[socket.id]= name;
        socket.broadcast.emit('user-joined', name);
    });

    //if someone's send a message broadcasting it to everyone
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    
      //broadcasting everyone if someone leaves.
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
const PORT = process.env.PORT || 8000;
http.listen(8000, () => {
    console.log(`Server is running on http://localhost:${8000}`);
});