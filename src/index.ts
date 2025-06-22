import express, { NextFunction, Request, Response} from "express";
import connectToDb from './config/db'
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload'
import logging from "./config/logging";
import apiRouter from "./routes/apis"
dotenv.config();
const NAMESPACE : string = 'Server'
const app = express();
connectToDb();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: 'File size must be 5mb or less',
}))

app.use((req:Request, res: Response, next: NextFunction)=>{
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL [${req.url}] - IP: [${req.socket.remoteAddress}]]`);
    res.on('finish', ()=>{
         logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
    })
    next();
});

app.use('/api',apiRouter)

app.get('/',(res:Response)=>{
    res.send('Api working')
}
)
app.listen(process.env.PORT || 4000,()=>{
console.log("http://localhost:4000")
})