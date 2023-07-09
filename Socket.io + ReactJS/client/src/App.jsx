import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messageReceive, setMessageReceive] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceive(data.message);
    });
  }, []);

  return (
    <>
      <div className="App">
        <input
          type="text"
          placeholder=".Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        <h2>Message: {message}</h2>
        <h2>Receive Message: {messageReceive}</h2>
      </div>
    </>
  );
}

export default App;
