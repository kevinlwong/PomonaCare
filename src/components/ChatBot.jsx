import CoraTagline from "../utils/CoraTagline";
import axios from "axios";
import {useState} from 'react';



export default function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    setError(null);
  
    try {
      const res = await axios.post(
        "https://ffd5-47-149-6-197.ngrok-free.app/api/openai",
        { prompt }
      );
      setResponse(res.data.result);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("[OpenAI Error]", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="px-4 py-40 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <CoraTagline text="Cora cares — your bilingual health companion." />

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
        <textarea
          className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          rows="4"
          placeholder="Ask me anything about your health..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        disabled={loading || !prompt}
      >
        {loading ? "Thinking..." : "Ask Cora"}
      </button>



      </form> 


        {response && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow max-w-xl mx-auto text-left whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Cora's Response:</h2>
          <p>{response}</p>
        </div>
        )}

        {error && (
          <p className="mt-4 text-red-500 font-medium">{error}</p>
        )}
      
    </div>
  );
}
