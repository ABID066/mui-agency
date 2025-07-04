import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['owner', 'admin', 'member'],
            default: 'member'
        }
    }],
    subscription: {
        plan: String,
        status: String,
        validUntil: Date
    }
}, { timestamps: true });

export default organizationSchema;