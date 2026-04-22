import React from "react";
import { User } from "lucide-react";

const UsersList = ({ users }) => {
  return (
    <div className="users-container">
      {users.map((user, index) => (
        <div key={index} className="user-item">
          <div className="user-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{user.username}</span>
            <span className="user-status">Online</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
