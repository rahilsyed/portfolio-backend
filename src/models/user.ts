import mongoose, {  Schema } from "mongoose";
import IUser from "../interfaces/user";


const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    role:{
        type:String,
        enum:['visitor', 'owner'],
        default:'visitor'
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

const User = mongoose.model<IUser>('user', userSchema);
export default User;