import React, { useState } from "react";
import { socket } from "../services/socket";
import { Send } from "lucide-react";

const ChatBox = () => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    socket.emit("send_message", {
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <form className="inputBox" onSubmit={sendMessage}>
      <div className="input-wrapper">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
        />
      </div>
      <button type="submit" className="send-button">
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatBox;
