import {Router} from 'express';
import authenticate from '../middlewares/authenticate';
import { addBlogs, deletePost, getBlog, getBlogs, updatePost } from '../controllers/blogs';
const router :Router= Router();


router.post('/add',authenticate, addBlogs);
router.get('/getAllPosts', getBlogs);
router.get('/getPost/:id', getBlog);
router.patch('/delete/:id',authenticate, deletePost);
router.patch('/update/:id',authenticate, updatePost);

export default router;