import { Request, Response } from "express";
import utils from "../helpers/utils";
import { errorResponse, successResponse, validationError } from "../helpers/api-responses";
import User from "../models/user";
import mongoose from "mongoose";


export const dashboardData = async (req: Request, res: Response) => {
    try {
        const userId = utils.getUserId(req);
        const user = await User.findOne({ id: userId });

        if (!userId) {
            return validationError(res, 'userId not found')
        }
        const dashboardData = await User.aggregate([
            // 1. Find logged-in user
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },

            // 2. Count blogs
            {
                $lookup: {
                    from: 'blogs',
                    localField: '_id',
                    foreignField: 'author',
                    pipeline: [
                        {
                            $match: {
                                isDeleted: false
                            }
                        },
                        {
                            $count: 'count'
                        }
                    ],
                    as: 'blogsCount'
                }
            },

            // 3. Count projects
            {
                $lookup: {
                    from: 'projects',
                    localField: '_id',
                    foreignField: 'userId',
                    pipeline: [
                        {
                            $match: {
                                isDeleted: false
                            }
                        },
                        {
                            $count: 'count'
                        }
                    ],
                    as: 'projectsCount'
                }
            },

            // 4. Count services
            {
                $lookup: {
                    from: 'services',
                    localField: '_id',
                    foreignField: 'userId',
                    pipeline: [
                        {
                            $match: {
                                isDeleted: false
                            }
                        },
                        {
                            $count: 'count'
                        }
                    ],
                    as: 'servicesCount'
                }
            },

            // 5. Extract counts
            {
                $addFields: {
                    totalBlogs: {
                        $ifNull: [{ $arrayElemAt: ['$blogsCount.count', 0] }, 0]
                    },
                    totalProjects: {
                        $ifNull: [{ $arrayElemAt: ['$projectsCount.count', 0] }, 0]
                    },
                    totalServices: {
                        $ifNull: [{ $arrayElemAt: ['$servicesCount.count', 0] }, 0]
                    }
                }
            },

            // 6. Remove temporary fields and password
            {
                $project: {
                    password: 0,
                    blogsCount: 0,
                    projectsCount: 0,
                    servicesCount: 0
                }
            }
        ]);

        return successResponse(res, "Fetched all documents successfully", dashboardData)
    } catch (error: any) {
        return errorResponse(res, error.message)
    }
}