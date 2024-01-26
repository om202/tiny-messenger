import React, { useState, useEffect } from "react";
import "./talk-style.css";
import Message from "../components/Message";
import Status from "../components/Status";

function Talk() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [websocket, setWebsocket] = useState(null);
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://l2x9a702m2.execute-api.us-east-2.amazonaws.com/production/"
    );

    ws.onopen = () => {
      setStatus("online");
    };
    ws.onmessage = (event) => {
      const message = event.data;
      setMessagesList([...messagesList, { type: "received", data: message }]);
    };
    ws.onclose = () => {
      setStatus("offline");
    };
    setWebsocket(ws);
    return () => ws.close();
  }, [messagesList]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.replace(/\s/g, "") === "") return;
    if (websocket) {
      const msg = {
        action: "sendmessage",
        message: message,
      };
      websocket.send(JSON.stringify(msg));
      setMessagesList([...messagesList, { type: "sent", data: message }]);
      setMessage("");
    }
  };

  return (
    <div className="talk-container">
      <div className="talk-body">
        <div className="title-container">
          <h2 className="font-large logo-container">
            <img src="logo.png" alt="logo" className="talk-logo" />
            Tiny Messenger
          </h2>
          <Status status={status} />
        </div>
        <ul className="messsage-container">
          {messagesList.length > 0 &&
            messagesList.map((msg, index) => {
              if (msg.type === "sent") {
                return <Message key={index} message={msg.data} type="sent" />;
              }
              if (msg.type === "received") {
                return (
                  <Message key={index} message={msg.data} type="received" />
                );
              }
              return null; // Add this line to fix the eslint problem
            })}
          {messagesList.length === 0 && <p>Be first to send a message 😊</p>}
        </ul>
      </div>
      <form className="input-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Talk;
