import {Router} from 'express';
import userRouter from './user';
import projectRouter from './project';
import blogRouter from './blog';
import serviceRouter from './services';
import dashboardRouter from './dashboard'
const app : Router = Router();

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/blogs', blogRouter);
app.use('/services', serviceRouter);
app.use('/dashboard',dashboardRouter );
export default app