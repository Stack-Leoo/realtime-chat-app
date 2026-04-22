import React from "react";
import { User } from "lucide-react";

const Message = ({ message, currentUser }) => {
  const isOwnMessage = message.username === currentUser;

  return (
    <div className={`message-wrapper ${isOwnMessage ? "own" : "other"}`}>
      <div className="message-bubble">
        {!isOwnMessage && (
          <div className="message-info">
            <User size={12} />
            <span className="message-username">{message.username}</span>
          </div>
        )}
        <div className="message-text">{message.message}</div>
        <span className="message-time">{message.time}</span>
      </div>
    </div>
  );
};

export default Message;
