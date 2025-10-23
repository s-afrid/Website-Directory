import express from 'express';
import mongoose from 'mongoose';
import WebsiteData from './models/website_data.js';

const app = express();

mongoose.connect(
  'mongodb+srv://afrid0052_db_user:Af02052002@cluster0.wohbqir.mongodb.net/Inspiro',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Route to get first 20 entries
app.get('/companies', async (req, res) => {
  try {
    const companies = await WebsiteData.find().limit(20);
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
