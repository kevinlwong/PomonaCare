import { useState, useRef, useEffect } from "react";
import axios from "axios";
import CoraTagline from "../utils/CoraTagline";

export default function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
  
    setLoading(true);
    setError(null);
  
    const newMessages = [...messages, { sender: "user", text: prompt }];
    setMessages(newMessages);
    setPrompt("");
  
    console.log("📤 Sending prompt to backend:", prompt);
  
    try {
      const res = await axios.post("/api/openai", { prompt });
      console.log("✅ Response from backend:", res.data);
  
      const aiReply = res.data.result;
      setMessages([...newMessages, { sender: "ai", text: aiReply }]);
    } catch (err) {
      console.error("❌ Axios error:", err.response?.data || err.message);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // HARD CODED RESPONSE FOR TESTING 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!prompt.trim()) return;
  
  //   setLoading(true);
  //   setError(null);
  
  //   const newMessages = [...messages, { sender: "user", text: prompt }];
  //   setMessages(newMessages);
  //   setPrompt("");
  
  //   console.log("📤 Simulating backend response for prompt:", prompt);
  
  //   // Simulate network delay and hardcoded response
  //   setTimeout(() => {
  //     const simulatedReply = `🧑‍⚕️ En español: Por favor, descansa y bebe mucha agua. Si los síntomas persisten, consulta a un médico.\n\nIn English: Please rest and drink plenty of water. If symptoms persist, consult a doctor.`;
      
  //     setMessages([
  //       ...newMessages,
  //       { sender: "ai", text: simulatedReply }
  //     ]);
  
  //     setLoading(false);
  //   }, 1000); // 1 second delay to simulate thinking
  // };
  
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-4 py-40 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <CoraTagline text="Cora cares — your bilingual health companion." />

      {/* Chat Window */}
      {messages.length > 0 && (
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-w-xl mx-auto h-[400px] overflow-y-auto shadow">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 p-3 rounded-lg max-w-[75%] text-sm whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto text-right"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl mx-auto">
        <textarea
          className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-white"
          rows="4"
          placeholder="Pregúntame cualquier cosa sobre salud"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
          disabled={loading || !prompt.trim()}
        >
          {loading ? "Thinking..." : "Ask Cora"}
        </button>
      </form>

      {/* Error */}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
}
