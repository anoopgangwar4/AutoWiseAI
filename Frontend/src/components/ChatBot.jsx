import { useState } from "react";
import "../public/css/Chatbot.css";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm your Vehicle Valuation Assistant. Is it a car or a bike?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMsg.text,
        session_id: sessionId,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setSessionId(data.session_id);
    setLoading(false);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">Product valuation AI</div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.sender}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="msg bot">Typing...</div>}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
