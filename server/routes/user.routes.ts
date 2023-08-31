import { verifyToken } from "../middlewares/auth";
import { Router } from "express";
import UserController from "../controllers/user.controllers";

const router = Router();

router.get("/", verifyToken, UserController.getUser);
router.put("/", verifyToken, UserController.updateUser);

router.post("/register", UserController.postUser);
router.post("/verifyUser", UserController.verifyUser);
router.get('/forgotPassword', UserController.forgotPassword);
router.post('/changePassword', UserController.changePassword);
router.get('/resendCode', UserController.resendCode);
router.post("/register/cancel", UserController.postUserCancel);
router.post("/subscription", verifyToken, UserController.getSubscription);
router.post("/payment", UserController.paymentSuccess);
router.post("/addUser", verifyToken, UserController.addUser);
router.get('/getAll', verifyToken, UserController.getAll);


export default router;