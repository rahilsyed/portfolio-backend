import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import logging from './logging';

const NAMESPACE = 'Database';
const mongo_URL = process.env.MONGODB
const connectToDb = () => {

    mongoose.connect(mongo_URL)
        .then(() => logging.info(NAMESPACE, 'database connected to :', mongo_URL))
        .catch((error: any) => {
            logging.error(NAMESPACE, "error connecting to databse", error);
        })
}

export default connectToDb;