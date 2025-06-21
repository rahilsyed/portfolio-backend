import { Response } from "express"
export const successResponse = (res: Response, message : string, data:any)=>{
    const resData = {
        status: true,
        message : message,
        data: data
    }
    return res.status(200).json(resData);
}

export const errorResponse = (res: Response, msg: string) => {
  let resData = {
    status: false,
    message: msg,
    data: null,
  };
  return res.status(500).json(resData);
};

export const notFoundResponse = (res: Response, msg: string) => {
  let resData = {
    status: false,
    message: msg,
    data: null,
  };
  return res.status(404).json(resData);
};

export const validationError = (res: Response, msg: String) => {
  let resData = {
    status: false,
    message: msg,
    data: null,
  };
  return res.status(400).json(resData);
};

export const unauthorizedResponse = (res: Response, msg: string) => {
  let resData = {
    status: false,
    message: msg,
    data: null,
  };
  return res.status(401).json(resData);
};

