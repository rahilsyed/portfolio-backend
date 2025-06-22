import mongoose, { Schema } from 'mongoose';
import IProject from '../interfaces/projects';

const projectSchema = new Schema<IProject>({
    projectName: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,

    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


const Project = mongoose.model<IProject>('project', projectSchema);
export default Project;