import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import companiesRoute from './routes/companies.js';

dotenv.config();

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Failed:', err));


// Route to get first 20 entries
app.use('/api/companies', companiesRoute);

app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

app.listen(3000, () => console.log('Server running on port 3000'));
