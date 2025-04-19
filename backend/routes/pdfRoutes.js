import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { extractTextFromPDF } from '../utils/extractTextFromPDF.js';
import { translateText } from '../utils/translate.js'; // ✅ don't forget this

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/extract-pdf', upload.single('file'), async (req, res) => {
  const filePath = req.file?.path;
  if (!filePath) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    console.log('[📄] Received file:', filePath);
    const extractedText = await extractTextFromPDF(filePath);

    // ✅ Translate it using OpenAI
    const { english, spanish } = await translateText(extractedText);
    console.log("[🌐] Translation output:", { english, spanish });

    // ✅ Return both versions
    res.json({ success: true, english, spanish });

    fs.unlinkSync(filePath); // optional: keep for dev
  } catch (err) {
    console.error('[❌] Extraction Error:', err);
    res.status(500).json({ success: false, message: 'Failed to extract text' });
  }
});

export default router;
