import mongoose,{ Schema } from 'mongoose';
import IServices from '../interfaces/services';

const serviceSchema = new Schema<IServices>({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    serviceName:{
        type:String,
        required: true,
    },
    serviceDescription:{
        type:String,
        required:true,
    },
},{timestamps:true});


const Service = mongoose.model<IServices>('service', serviceSchema);
export default Service;