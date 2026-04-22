import React, { useEffect, useState, useRef } from "react";
import { socket } from "../services/socket";
import ChatBox from "../components/ChatBox";
import Message from "../components/Message";
import UsersList from "../components/UsersList";
import { LogIn, MessageSquare, Hash, Users } from "lucide-react";
import "../App.css";

const Chat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const joinRoom = (e) => {
    e.preventDefault();
    if (username && room) {
      socket.emit("join_room", { username, room });
      setJoined(true);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("users_list", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("receive_message");
      socket.off("users_list");
    };
  }, []);

  if (!joined) {
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={joinRoom}>
          <h2>Chat Online</h2>
          <div className="form-group">
            <label>Tu Nombre</label>
            <input
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Sala de Chat</label>
            <input
              placeholder="Nombre de la sala"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            <LogIn size={20} /> Entrar al Chat
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <Users size={20} color="#00d4ff" />
          <h3>Usuarios</h3>
        </div>
        <div className="users-list">
          <UsersList users={users} />
        </div>
      </div>

      <div className="chat">
        <div className="chat-header">
          <div className="room-info">
            <h2>
              <Hash size={20} color="#00d4ff" />
              {room}
            </h2>
            <span>{users.length} usuarios conectados</span>
          </div>
          <MessageSquare size={20} color="#a0a0c0" />
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} currentUser={username} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
