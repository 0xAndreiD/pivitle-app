import { Router } from "express";
import { getSubscriptions, sendUserEmail } from "../controllers/Static.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get('/subscriptions', verifyToken, getSubscriptions);
router.post('/sendUserEmail', verifyToken, sendUserEmail);


export default router;