// backend/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import openaiRoutes from './routes/openai.js';
import extractTextRouter from './routes/pdfRoutes.js';
import translateDoc from './routes/translateDoc.js';
// import clinicRoutes from './routes/clinics.js'

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/openai', openaiRoutes);
app.use('/api', extractTextRouter);
app.use('/api', translateDoc);
// app.use('/api/clinics', clinicRoutes)
// console.log("Loaded key:", process.env.OPENAI_API_KEY)
// Get
app.get('/', (req, res) => {
  res.send('PomonaCare AI Backend is running')
})

//Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
