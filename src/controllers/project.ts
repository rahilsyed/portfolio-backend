import { Request, Response } from "express";
import utils from "../helpers/utils";
import User from "../models/user";
import { errorResponse, successResponse, validationError } from "../helpers/api-responses";
import { UploadedFile } from 'express-fileupload'
import Project from "../models/projects";
import constants from '../helpers/constants'
export const addProject = async (req: Request, res: Response) => {
    try {
        const { projectName, projectDescription, link } = req.body;
        const userId = utils.getUserId(req);
        const userExist = await User.findById(userId);
        if (!userExist) {
            return validationError(res, 'User des not exists')
        }
        if (userExist.role !== constants.ROLES.ADMIN) {
            return validationError(res, 'Only owner can add the projects')
        }
        if (!projectName || !projectDescription) {
            return validationError(res, 'Missing required fields');
        }
        const image = req?.files.img as UploadedFile;
        let uploadedImgUrl = '';
      if(image){
        uploadedImgUrl= await utils.uploadToCloudinary(image.tempFilePath);
      }
        const project = new Project({
            projectName,
            projectDescription,
            image: uploadedImgUrl,
            createdBy: userExist._id,
            link
        });

        await project.save();
        return successResponse(res, 'Project Uploaded SuccessFully', project);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}



export const deleteProject = async (req: Request, res: Response) => {
    try {
        const deleteId = req.params.id;
        const userId = utils.getUserId(req);
        const userExist = await User.findById(userId);
        if (!userExist) {
            return validationError(res, 'User not found in database');
        }

        if (userExist.role !== constants.ROLES.ADMIN) {
            return validationError(res, 'Only admin can delete the project');
        }

        const deleteProject = await Project.findByIdAndUpdate(deleteId, { $set: { isDeleted: true } });

        return successResponse(res, 'Project deleted successfully', deleteProject);

    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const getProjects = async (req:Request, res: Response) => {
    try {
        const allProjects = await Project.find({ isDeleted: { $ne: true } })
            .limit(6)
            .sort({ createdAt: -1 })
            .populate('createdBy', 'fullName');

        return successResponse(res, 'All projects fetched successfully', allProjects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return errorResponse(res, 'Failed to fetch projects');
    }
};
export const getProject = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findOne({ _id: projectId }).populate('createdBy', 'fullName');
        return successResponse(res, 'Project fetched', project);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}