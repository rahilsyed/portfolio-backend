import { Request, Response } from "express";
import { errorResponse, notFoundResponse, successResponse, validationError } from "../helpers/api-responses";
import utils from "../helpers/utils";
import User from "../models/user";
import Blog from "../models/blog";
import constants from '../helpers/constants'
import { UploadedFile } from "express-fileupload";


export const addBlogs = async (req: Request, res: Response) => {
    try {
        const { title, description, category } = req.body;
        if (!title || !description || !category) {
            return validationError(res, 'Missing required fields');
        }
        const userId = utils.getUserId(req);
        const userExists = await User.findOne({ _id: userId });
        if (!userExists) {
            return notFoundResponse(res, 'User desnot exists in database');
        }
        if(userExists.role !== constants.ROLES.ADMIN){
            return validationError(res, 'only admin can add posts')
        }
        const image = req.files.image as UploadedFile;
        let uploadedImageUrl = '';
        if (image) {
            uploadedImageUrl = await utils.uploadToCloudinary(image.tempFilePath);
        }

        const post = new Blog({
            title,
            description,
            category,
            image: uploadedImageUrl,
            author: userExists._id,
        });
        await post.save();

        return successResponse(res, "Blog Posted Successfully", post);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}


export const getBlogs = async(req:Request, res:Response)=>{
    try {
        const posts = await Blog.find({isDeleted:{$ne:true}}).sort({createdAt:-1}).populate('author', 'fullName');
        if(!posts){
            return notFoundResponse(res, 'No Blogs Found');
        }
        return successResponse(res, "All blogs Fetched ", posts);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}
export const getBlog = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id
        const post = await Blog.findById(id).populate('author', 'fullName');
        if(!post){
            return notFoundResponse(res, 'Blog not found');
        }
        return successResponse(res, "All blogs Fetched ", post);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const deletePost = async(req: Request, res:Response)=>{
    try {
        const userId = utils.getUserId(req);
        const userExists = await User.findById(userId);
        if(!userExists){
            return validationError(res, 'User doest not exists in database');
        }
        if(userExists.role !== constants.ROLES.ADMIN){
            return validationError(res, 'Only admin can delete blogs');
        }
        
        const deleteBlog = await Blog.findByIdAndUpdate(req.params.id, {$set:{isDeleted:true}});
        return successResponse(res, 'Post deleted successfully', deleteBlog);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const updatePost =async (req:Request, res:Response)=>{
    try {
        const id = req.params.id;
        const userId = utils.getUserId(req);
        const userExists = await User.findById(userId);
        if(!userExists){
            return validationError(res, 'user doesnot exists in DB');
        }
        if(userExists.role !== constants.ROLES.ADMIN){
            return validationError(res, 'Only admin can update blogs');
        }
        const updatedData = {...req.body}

        if(req.files && req.files.image){
            let image = req.files.image as UploadedFile;
            const uploadedImageUrl = await utils.uploadToCloudinary(image.tempFilePath);
            updatedData.image = uploadedImageUrl;
        }

        const updatedPost = await Blog.findByIdAndUpdate(id, updatedData, {new:true});
        return successResponse(res, 'Post updated Successfully', updatedPost);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}


