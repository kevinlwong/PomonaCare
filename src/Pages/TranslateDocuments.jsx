import { useState } from 'react';
import FileUploader from '../components/FileUploader';

export default function TranslateDocuments() {
  const [extractedText, setExtractedText] = useState('');

  return (
    <div className="min-h-screen py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          📄 Document Translation
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-center mb-8">
          Upload a medical document (PDF, DOCX, or TXT) and let Cora extract the content for translation and understanding.
        </p>

        <FileUploader onTextExtracted={setExtractedText} />

        {extractedText && (
          <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Extracted Text</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-100">
              {extractedText}
            </pre>

            {/* Optional: Button to send to OpenAI */}
            {/* 
            <button 
              onClick={handleTranslate} 
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded transition"
            >
              🌐 Translate with Cora
            </button> 
            */}
          </div>
        )}
      </div>
    </div>
  );
}
