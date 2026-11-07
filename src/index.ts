import express, { NextFunction, Request, Response } from "express";
import connectToDb from './config/db';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import logging from "./config/logging";
import apiRouter from "./routes/apis";
import cors from 'cors';
import { errorResponse } from "./helpers/api-responses";
dotenv.config();
const PORT = process.env.PORT ||4000;
const NAMESPACE: string = 'Server';
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: 'File size must be 5mb or less',
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL [${req.url}] - IP: [${req.socket.remoteAddress}]]`);
    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
        );
    });
    next();
});

app.use(async(req: Request, res:Response, next:NextFunction)=>{
    try {
        logging.info(NAMESPACE, `METHOD: [${req.method}]`)
        await connectToDb();
        next();
    } catch (error) {
        logging.error("Database", "Connection unavailable", error);

        const reason = error instanceof Error ? error.message : String(error);
        // TEMP DEBUG: fingerprint of the MONGODB value (no password exposed)
        const uri = process.env.MONGODB ?? "";
        const cred = uri.match(/:\/\/([^@]*)@([^/?]*)/);
        const [user = "", ...pw] = (cred?.[1] ?? "").split(":");
        const fingerprint = {
            length: uri.length,
            user,
            pwLength: pw.join(":").length,
            host: cred?.[2],
            tail: uri.slice(uri.indexOf("@")).replace(/^@[^/?]*/, "@<host>"),
            pwSha256: require("crypto").createHash("sha256").update(pw.join(":")).digest("hex").slice(0, 12),
            sha256: require("crypto").createHash("sha256").update(uri).digest("hex").slice(0, 12),
            env: process.env.VERCEL_ENV,
        };
        return errorResponse(res, `Database connection unavailable: ${reason} | ${JSON.stringify(fingerprint)}`)
    }

})
app.use('/api', apiRouter);

app.get('/health', (req: Request, res: Response) => {
     logging.info(NAMESPACE, `METHOD: [${req.method}] - URL [${req.url}] - IP: [${req.socket.remoteAddress}]]`);
    res.send('OK',)
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);

});
