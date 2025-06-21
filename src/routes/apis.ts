import {Router} from 'express';
import userRouter from "./user"
import projectRouter from './project'
const app : Router = Router();

app.use('/user', userRouter);
app.use('/project', projectRouter);

export default app