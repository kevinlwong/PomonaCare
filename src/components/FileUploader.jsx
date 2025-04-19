import { useState } from 'react';
// import axios from 'axios';

export default function FileUploader({ onResult }) {
    const [loading, setLoading] = useState(false);
  
    const handleUpload = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const res = await fetch("http://localhost:5000/api/extract-pdf", {
          method: "POST",
          body: formData,
        });
  
        const data = await res.json();
        if (data.success) {
          onResult({ english: data.english, spanish: data.spanish });
        } else {
          alert("Extraction failed.");
        }
      } catch (err) {
        console.error("Upload failed:", err);
        alert("An error occurred during upload.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="text-center">
        <label className="cursor-pointer inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition">
          {loading ? "Uploading..." : "📤 Upload Document"}
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>
    );
  }
  