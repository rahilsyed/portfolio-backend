import { Request, Response } from "express";
import { errorResponse, notFoundResponse, successResponse, validationError } from "../helpers/api-responses";
import bcrypt from 'bcrypt'
import User from "../models/user";
import utils from "../helpers/utils";
import constants from '../helpers/constants'


export const addUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, role } = req.body;
        console.log(role)
        if (!fullName || !email || !password) {
            return notFoundResponse(res, 'Missing required Fields')
        }
        const userExists = await User.findOne({ email });

        if (userExists) {
            return validationError(res, 'User with this email already exists');
        }
        if (role === constants.ROLES.ADMIN) {
            return validationError(res, 'owner is already added')
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullName, email, password: hashedPassword, role
        })
        await user.save();
        return successResponse(res, 'User Created Successfully', user);

    } catch (error: any) {
        return errorResponse(res, error.message)
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return notFoundResponse(res, 'Missing required fields');
        }
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return validationError(res, 'User doesnot exists');
        }
        const token = utils.generateToken(userExists);
        const user = {
            userExists,
            token
        }
        return successResponse(res, 'User successfully loggedIn', user);

    } catch (error) {
        return errorResponse(res, error.message);
    }
}


export const getAllUser = async (req: Request, res: Response) => {
    try {
        const userId = utils.getUserId(req);
        const userExists = await User.findById(userId);
        if (!userExists) {
            return notFoundResponse(res, "User doesnot exists on datanse");
        }
        if (userExists.role !== 'owner') {
            return validationError(res, 'Only owner can view all the Users');
        }
        const allUsers = await User.find({}).sort({createdAt:-1});
        return successResponse(res, 'All Users Found', allUsers);
    } catch (error) {
        return errorResponse(res, error.message);
    }

}