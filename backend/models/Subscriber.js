import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
