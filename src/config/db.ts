import mongoose from 'mongoose';
import dns from 'node:dns';
import dotenv from 'dotenv'
import logging from './logging';
dotenv.config()
dns.setServers(["8.8.8.8", "8.8.4.4"]);

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