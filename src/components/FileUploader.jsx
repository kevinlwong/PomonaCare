import { useState } from 'react';
import axios from 'axios';

export default function FileUploader({ onResult }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/translate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onResult(res.data);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="text-center space-y-4">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="block mx-auto"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload and Translate
      </button>
    </div>
  );
}
