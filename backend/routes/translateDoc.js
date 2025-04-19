// for calling gpt api and translating the documents
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { extractTextFromPDF } from '../utils/extractTextFromPDF.js';
import { translateText } from '../utils/translate.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/translate-doc', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  if (!fs.existsSync(filePath)) {
    console.error('[extractTextFromPDF] File not found:', filePath);
    return '';
  }
  
  try {
    const extractedText = await extractTextFromPDF(filePath);
    const translation = await translateText(extractedText);
    fs.unlinkSync(filePath); // Cleanup uploaded file

    res.json({ original: extractedText, translated: translation });
  } catch (err) {
    console.error('[/translate-doc] Failed:', err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

export default router;
