import dotenv from "dotenv";
dotenv.config();


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

import companiesRoute from './routes/companies.js';
import subscriberRoutes from './routes/subscriberRoute.js'
import submissionRoutes from './routes/submissionRoute.js'
import sponsorRoutes from './routes/sponsorRoute.js'
import aboutRoutes from "./routes/about.js"; 
import privacyRoutes from './routes/privacy.js'; 
import adminPrivacyRouter from './routes/admin/privacy.js';
import adminTermsRouter from './routes/adminTerms.js'

import authRoutes from "./routes/auth.js";
import analyticsRoutes from './routes/analytics.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/admin/privacy', adminPrivacyRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Failed:', err));


// Route to get entries
app.use('/api/companies', companiesRoute);

// Use subscriber routes
app.use("/subscribers", subscriberRoutes);

// Use submission routes
app.use("/submission", submissionRoutes);

// Sponsor inquiry route
app.use("/api/sponsor", sponsorRoutes);

app.use("/api", authRoutes);

app.use('/api/analytics', analyticsRoutes);

app.use("/api/about", aboutRoutes);

app.use('/api/privacy', privacyRoutes);

app.use('/api/admin/terms', adminTermsRouter);
app.use('/api/terms', adminTermsRouter); // for frontend fetching




// ✅ Serve frontend (Vite build output)
const frontendPath = path.join(__dirname, "../client/dist");
app.use(express.static(frontendPath));

// All other routes → index.html (for React Router)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
app.listen(process.env.PORT, () => console.log('Server running on port 3000'));
