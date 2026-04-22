const users = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    // Unirse a una sala
    socket.on("join_room", ({ username, room }) => {
      socket.join(room);

      users[socket.id] = { username, room };

      // Enviar usuarios actualizados
      const roomUsers = Object.values(users).filter(
        (user) => user.room === room
      );

      io.to(room).emit("users_list", roomUsers);

      console.log(`${username} se unió a ${room}`);
    });

    // Mensajes
    socket.on("send_message", (data) => {
      const user = users[socket.id];

      if (user) {
        io.to(user.room).emit("receive_message", {
          ...data,
          username: user.username,
        });
      }
    });

    // Desconexión
    socket.on("disconnect", () => {
      const user = users[socket.id];

      if (user) {
        const room = user.room;
        delete users[socket.id];

        const roomUsers = Object.values(users).filter(
          (u) => u.room === room
        );

        io.to(room).emit("users_list", roomUsers);
      }

      console.log("Usuario desconectado:", socket.id);
    });
  });
};