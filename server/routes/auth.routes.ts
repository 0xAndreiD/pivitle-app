import express from "express";

import AuthControllers from "../controllers/auth.controllers";

const router = express.Router();

//  Input : username/password via body
//  HTTP Success : 200, message and user infos.
//  HTTP Errors : 400, 401.
router.post("/login", AuthControllers.postLogin);


export default router;