const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const chatSocket = require("./sockets/chatSocket");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

chatSocket(io);

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});