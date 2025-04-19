import express from 'express';
import multer from 'multer';
import { extractTextFromPDF } from '../utils/extractTextFromPDF.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // save uploaded files here

router.post('/extract-pdf', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const text = await extractTextFromPDF(filePath);
    res.json({ extracted: text });
  } catch (err) {
    console.error('❌ Extract error:', err);
    res.status(500).json({ error: 'Failed to extract text.' });
  }
});

export default router;
