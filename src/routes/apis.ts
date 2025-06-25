import {Router} from 'express';
import userRouter from './user';
import projectRouter from './project';
import blogRouter from './blog';
import serviceRouter from './services'
const app : Router = Router();

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/blogs', blogRouter);
app.use('/services', serviceRouter);
export default app