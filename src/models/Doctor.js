import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        imgUrl: {
            type: String
        },
        DOB: {
            type: String
        },
        gender: {
            type: String
        },
        address: {
            type: String
        },
        phone: {
            type: String
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Department',
            required: true,
        },
    }, { timestamps: true }
);

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;
