import { ObjectId } from "mongoose";


export default interface IProject{
    _id:ObjectId;
    projectName: String;
    projectDescription: String;
    createdBy:ObjectId;
    image: String;
    link: String;
    isDeleted: boolean;
}