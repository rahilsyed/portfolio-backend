import {Router} from "express";
const router : Router = Router();
import { addUser, login,getAllUser } from "../controllers/user";
import authenticate from "../middlewares/authenticate";

router.post("/add", addUser)
router.post('/login', login )
router.get('/users', authenticate, getAllUser )

export default router