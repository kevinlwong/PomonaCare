import fs from "fs";
import Tesseract from "tesseract.js";
import { fromPath } from "pdf2pic";

const tempDir = "./temp";
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

export async function extractTextFromPDF(filePath) {
  try {
    const pdfModule = await import("pdf-parse");
    const pdf = pdfModule.default;
    const dataBuffer = fs.readFileSync(filePath);
    const parsed = await pdf(dataBuffer);
    const cleanText = parsed.text.trim();

    if (cleanText.length > 50) {
      console.log("[✅] Extracted using pdf-parse");
      return cleanText;
    } else {
      console.warn("[⚠️] Not enough text, using OCR...");
    }
  } catch (err) {
    console.warn("[❌] pdf-parse failed:", err.message);
  }

  try {
    const converter = fromPath(filePath, {
      density: 300,
      saveFilename: "ocr-temp",
      savePath: "./temp",
      format: "png",
      width: 1024,
      height: 1024,
    });

    const image = await converter(1);
    const result = await Tesseract.recognize(image.path, "eng", {
      logger: (m) => console.log("[OCR]", m.status),
    });

    // Cleanup image
    if (fs.existsSync(image.path)) fs.unlinkSync(image.path);

    return result.data.text.trim();
  } catch (err) {
    console.error("[❌] OCR failed:", err.message);
    return "";
  }
}
