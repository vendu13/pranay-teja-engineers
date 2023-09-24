import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String, required: true, default: '',
    },
    desc: {
        type: String, required: true, default: '',
    },
    location: {
        type: String, default: '',
    },
    category: {
        type: String, default: '',
    },
    images: {
        gallery: {type: Number, required: true, default: 1},
    },
}, {
    timestamps: true,
    methods: {
        toAPI() {
            return {
                id: this._id,
                title: this.title,
                desc: this.desc,
                location: this.location,
                type: this.category,
                images: this.images
            };
        },
    },
});

export default mongoose.model('Project', ProjectSchema);
