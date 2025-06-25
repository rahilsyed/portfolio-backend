import { ObjectId } from 'mongoose';




export default interface IServices{
    userId:ObjectId;
    serviceName: String;
    serviceDescription: String;
    isDeleted: Boolean;
}