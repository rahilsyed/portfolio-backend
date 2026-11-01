import {Router} from 'express'
import { dashboardData } from '../controllers/dashboard';


const router = Router();
router.get('/get',dashboardData)


export default router;