import React from "react";
import "./message-style.css";

function Message({ message, type }) {
  return (
    <li
      className={`message ${
        type === "sent" ? "message-sent" : "message-received"
      }`}
    >
      {message}
    </li>
  );
}

export default Message;
