import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const getUserId = (req: Request)=>{
  let token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;
     if (token) {
    let decodded: JwtPayload = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
    let userId = decodded._id;
    return userId;
  }
}

const generateToken = (user:any)=>{
    const JwtPayload = user.toJSON();
    let token = jwt.sign(JwtPayload, process.env.SECRET_KEY,{
      expiresIn:'14h',
    });
    return token;
}

const uploadToCloudinary =async (imagePath:string)=>{
  const folderPath = `portfolio`;
  const result = await cloudinary.v2.uploader.upload(imagePath,{
    folder:folderPath,
    resource_type:'auto',
     transformation: [
      { width: 800, height: 600, crop: 'limit' },
      { quality: 'auto' },
    ],
  })
  return result.secure_url;
}
export default{
    getUserId,
    generateToken,
    uploadToCloudinary
}