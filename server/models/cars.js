import mongoose from 'mongoose';



const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    color: String,
    mileage: String,
    images: [String],
    condition: String,
    sold: Boolean,
    price: Number,
    description: String,
    date: String,
    seller: String
})

 const Car = mongoose.model("Car", carSchema)
export default Car;