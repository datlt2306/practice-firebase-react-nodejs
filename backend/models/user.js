import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true
    },
    picture: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
    // wishlist: [
    //     {
    //         type: ObjectId,
    //         ref: 'product'
    //     }
    // ]
}, { timestamps: true });

export default mongoose.model('User', userSchema);