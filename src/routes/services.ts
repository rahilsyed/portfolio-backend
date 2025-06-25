import { Router } from 'express';
import { addServices, getServices } from '../controllers/services';
import authenticate from '../middlewares/authenticate';

const router: Router = Router();

router.post('/add', authenticate, addServices);
router.get('/getAllPost', getServices);


export default router;