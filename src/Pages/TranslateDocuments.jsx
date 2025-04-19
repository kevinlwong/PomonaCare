import { useState } from 'react';
import FileUploader from '../components/FileUploader';

export default function TranslateDocuments() {
  const [result, setResult] = useState({ english: '', spanish: '' });

  return (
    <div className="min-h-screen py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          📄 Document Translation
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-center mb-8">
          Upload a medical document (PDF, DOCX, or TXT) and let Cora extract the content for translation and understanding.
        </p>

        {/* 🔁 Use setResult to store both English + Spanish */}
        <FileUploader onResult={setResult} />

        {(result.english || result.spanish) && (
          <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">🧾 Extracted Content</h2>

            {/* <div className="mb-6">
              <h3 className="font-bold mb-1">🇺🇸 English</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-100">
                {result.english}
              </pre>
            </div> */}

            <div>
              <h3 className="font-bold mb-1">🇪🇸 Spanish</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-100">
                {result.spanish}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
