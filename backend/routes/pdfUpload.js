// for pdf upload with express and multer
import express from 'express';
import multer from 'multer';
import { extractTextFromPDF } from '../utils/extractTextFromPDF.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/extract-text', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const extractedText = await extractTextFromPDF(filePath);

    // Optionally delete uploaded file too
    // fs.unlinkSync(filePath);

    res.json({ success: true, text: extractedText });
  } catch (err) {
    console.error('[API] Error:', err);
    res.status(500).json({ success: false, message: 'Text extraction failed' });
  }
});

export default router;
