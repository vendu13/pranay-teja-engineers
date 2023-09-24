import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true,
    },
    lastName: {
        type: String, required: true,
    },
    email: {
        type: String, required: true,
    },
    phone: {
        type: String, required: true,
    },
    message: {
        type: String, required: true,
    },
}, {
    timestamps: true,
    methods: {
        toAPI() {
            return {
                id: this._id,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phone: this.phone,
                message: this.message,
            };
        },
    },
});

export default mongoose.model('Message', MessageSchema);
