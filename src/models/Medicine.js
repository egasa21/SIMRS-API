import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        purchaseDate: {
            type: String,
            required: true,
        },
        expire: {
            type: String,
            required: true,
        },
        expireEnd: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }, { timestamps: true }
)

const Medicine = mongoose.model('Medicine', MedicineSchema);
export default Medicine;
