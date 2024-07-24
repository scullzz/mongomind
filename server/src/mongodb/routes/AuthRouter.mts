import {Router} from "express";
import funcController from "../controller/FuncController.mjs";

const router = Router();
router.post("/login", funcController.login);
router.get("/getTask", funcController.getTask);
router.post("/sendTask", funcController.sendAnswear);
router.post("/checkTask", funcController.checkAnswear);
router.get("/getUser", funcController.getUserInfo);

export default router;