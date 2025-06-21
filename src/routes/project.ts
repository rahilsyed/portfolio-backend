import {Router } from 'express';
import authenticate from '../middlewares/authenticate';
import { addProject, deleteProject, getProject, getProjects } from '../controllers/project';

const router:Router = Router();


router.post('/add', authenticate,addProject);
router.patch('/delete/:id', authenticate, deleteProject);
router.get('/getProjects',getProjects);
router.get('/getProjects/:id', getProject);
export default router