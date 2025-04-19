import { useState } from 'react';
import axios from 'axios';

export default function FileUploader({ onTextExtracted }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/extract-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onTextExtracted(res.data.text);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? 'Extracting...' : 'Extract Text from PDF'}
      </button>
    </div>
  );
}
