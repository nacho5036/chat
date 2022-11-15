import express from 'express';
import http from 'http';
import socket from 'socket.io'; 

var app = express();
var server = http.Server(app);
var io = socket(server); 
 
app.use(express.static("public")); 

io.on("connection", function(socket){
  socket.on("newuser", function(username){
    socket.broadcast.emit("update", username + " se unió a la conversación"); 
  }); 
  socket.on("exituser", function(username){
    socket.broadcast.emit("update", username + " salió de la conversación"); 
  });
  socket.on("chat", function(message){
    socket.broadcast.emit("chat", message); 
  });
}); 

server.listen(3000); 

