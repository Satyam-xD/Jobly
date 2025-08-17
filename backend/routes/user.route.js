import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/test").get((req, res) => {
    res.status(200).json({ message: "Backend server is running successfully!" });
});
router.route("/me").get(isAuthenticated, (req, res) => {
    res.status(200).json({ 
        success: true, 
        user: req.user 
    });
});

export default router;

