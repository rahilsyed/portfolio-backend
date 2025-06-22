import mongoose, { Schema } from "mongoose";
import IBlogs from "../interfaces/blog";

const blogSchema = new Schema<IBlogs>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: { type: String, required: true },
    category: {
        type: String,
        enum: ['coding', 'fitness', 'lifestyle'],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })



const Blog = mongoose.model<IBlogs>('blog', blogSchema)
export default Blog;