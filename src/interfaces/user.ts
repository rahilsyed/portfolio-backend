import {ObjectId} from 'mongoose';


export default interface IUser{
    _id: ObjectId;
    fullName: String;
    email: String;
    password : String;
    image: String;
    isDeleted: Boolean;
    role: String;
}