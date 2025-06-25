import { Request, Response } from 'express';
import {
  errorResponse,
  successResponse,
  validationError,
} from '../helpers/api-responses';
import utils from '../helpers/utils';
import User from '../models/user';
import Service from '../models/services';

export const addServices = async (req: Request, res: Response) => {
  try {
    const { serviceName, serviceDescription } = req.body;
    if (!serviceName || !serviceDescription) {
      return validationError(res, 'Missing required fields');
    }
    const userId = utils.getUserId(req);
    const userExists = await User.findById(userId);

    if (!userExists) {
      return validationError(res, 'User doesnot exists in database');
    }
    const details = new Service({ userId, serviceName, serviceDescription });
    return successResponse(res, 'Service added', details);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getServices = async (req: Request, res: Response) => {
  try {
    const allServices = await Service.find({ isDeleted: { $ne: true } })
      .limit(6)
      .sort({ createdAt: -1 });
    return successResponse(res, 'all services fetched', allServices);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};
