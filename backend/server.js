import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

import companiesRoute from './routes/companies.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Failed:', err));


// Route to get first 20 entries
app.use('/api/companies', companiesRoute);

// ✅ Serve frontend (Vite build output)
const frontendPath = path.join(__dirname, "../../client/dist");
app.use(express.static(frontendPath));

// All other routes → index.html (for React Router)
app.get("/:path(.*)", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
app.listen(3000, () => console.log('Server running on port 3000'));
