import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, 
  location: { type: String, required: true },
  price: { type: Number, required: true }, 
});

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
export default Hotel;

