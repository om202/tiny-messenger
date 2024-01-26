import React from "react";
import "./status-style.css";

function Status({ status }) {
  return (
    <div className="status-container">
      {status === "online" && <div className="status-online status-round"></div>}
      {status === "offline" && <div className="status-offline status-round"></div>}
    </div>
  );
}

export default Status;
