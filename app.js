import express from 'express';
import http from 'http';
import socket from 'socket.io'; 

var app = express();
var server = http.Server(app);
var io = socket(server); 

app.set('port', process.env.PORT || 3000); 
server.listen(app.get('port'), ()=> console.log("Servidor escuchando")); 
 
app.use(express.static("public")); 

app.get('/', function (req, res){
  res.sendFile(__dirname + '/public');
}); 

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

