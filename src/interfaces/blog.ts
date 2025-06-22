import { ObjectId } from "mongoose";



export default interface IBlogs{
    _id:ObjectId;
    title:String;
    description: String;
    image: String;
    isDeleted: Boolean;
    author:ObjectId;
}