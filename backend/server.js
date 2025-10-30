import dotenv from "dotenv";

dotenv.config();

console.log("✅ Cloudinary Key:", process.env.CLOUDINARY_API_KEY);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken.js";

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


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/about", aboutRoutes);
console.log("✅ /api/about route loaded");


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

app.get("/test", (req, res) => {
  console.log("✅ /test route hit!");
  res.send("Backend working fine!");
});



app.use('/api/privacy', privacyRoutes);

app.use('/api/admin/terms', adminTermsRouter);
app.use('/api/terms', adminTermsRouter); // for frontend fetching


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend (Vite build output)
const frontendPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(frontendPath, { index: false }));

// ✅ React Router fallback (must include next!)
app.use((req, res, next) => {
  // Don't interfere with API routes
  if (req.path.startsWith("/api")) return next();

  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

