import { Router } from "express";
import { create, get, update, deleteOne, reply } from "../controllers/CommonLogs.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/:id")
    .post(verifyToken, create)
    .put(verifyToken, update)
    .delete(verifyToken, deleteOne);

    
router.route("/:id/reply").put(verifyToken, reply);

router.get('/:id', verifyToken, get);



export default router;