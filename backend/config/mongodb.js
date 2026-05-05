import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => 
        console.log("Database Connected ✅")
    )

    // ✅ FIXED (NO extra /prescripto)
    await mongoose.connect(process.env.MONGODB_URI)
}

export default connectDB