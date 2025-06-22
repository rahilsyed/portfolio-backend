import {Router} from 'express';
import userRouter from './user';
import projectRouter from './project';
import blogRouter from './blog'
const app : Router = Router();

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/blogs', blogRouter)

export default app