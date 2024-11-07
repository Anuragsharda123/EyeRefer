"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const signupValidation_1 = __importDefault(require("../middlewares/formValidation.ts/signupValidation"));
const loginValidation_1 = __importDefault(require("../middlewares/formValidation.ts/loginValidation"));
const router = (0, express_1.Router)();
router.post("/register", signupValidation_1.default, userController_1.registerUser);
router.post("/login", loginValidation_1.default, userController_1.loginUser);
router.put("/verify", userController_1.verifyUser);
router.get('/user', userAuth_1.default, userController_1.getUser);
router.get('/md-list', userAuth_1.default, userController_1.getMDList);
exports.default = router;
