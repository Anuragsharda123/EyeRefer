"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMDList = exports.getUser = exports.loginUser = exports.verifyUser = exports.registerUser = void 0;
const env_1 = require("../environment/env");
const Address_1 = __importDefault(require("../models/Address"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Security_Key = env_1.Local.SECRET_KEY;
const otpGenerator = () => {
    return String(Math.round(Math.random() * 10000000000)).slice(0, 6);
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, doctype, email, password } = req.body;
        const isExist = yield User_1.default.findOne({ where: { email: email } });
        if (isExist) {
            res.status(401).json({ "message": "User already Exist" });
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield User_1.default.create({ firstname, lastname, doctype, email, password: hashedPassword });
            if (user) {
                const OTP = otpGenerator();
                (0, mailer_1.default)(user.email, OTP);
                res.status(201).json({ "OTP": OTP, "message": "Data Saved Successfully" });
            }
            else {
                res.status(403).json({ "message": "Something Went Wrong" });
            }
        }
    }
    catch (err) {
        res.status(500).json({ "message": err });
    }
});
exports.registerUser = registerUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ where: { email } });
        if (user) {
            user.is_verified = true;
            user.save();
            res.status(200).json({ "message": "User Verfied Successfully" });
        }
        else {
            res.status(403).json({ "message": "Something Went Wrong" });
        }
    }
    catch (err) {
        res.status(500).json({ "message": err });
    }
});
exports.verifyUser = verifyUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ where: { email } });
        if (user) {
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (isMatch) {
                if (user.is_verified) {
                    const token = jsonwebtoken_1.default.sign({ uuid: user.uuid }, Security_Key);
                    res.status(200).json({ "token": token, "user": user, "message": "Login Successfull" });
                }
                else {
                    const OTP = otpGenerator();
                    (0, mailer_1.default)(user.email, OTP);
                    res.status(200).json({ "user": user, "OTP": OTP, "message": "OTP sent Successfully" });
                }
            }
            else {
                res.status(403).json({ "message": "Invalid Password" });
            }
        }
        else {
            res.status(403).json({ "message": "User doesn't Exist" });
        }
    }
    catch (err) {
        res.status(500).json({ "message": err });
    }
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uuid } = req.user;
        const user = yield User_1.default.findOne({ where: { uuid: uuid }, include: Address_1.default });
        if (user) {
            res.status(200).json({ "user": user, "message": "User Found" });
        }
        else {
            res.status(404).json({ "message": "User Not Found" });
        }
    }
    catch (err) {
        res.status(500).json({ "message": `Error--->${err}` });
    }
});
exports.getUser = getUser;
const getMDList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("11111111111111");
        const mdList = yield User_1.default.findAll({ where: { doctype: 1 }, include: Address_1.default });
        if (mdList) {
            res.status(200).json({ "mdList": mdList, "message": "MD List Found" });
        }
        else {
            res.status(404).json({ "message": "MD List Not Found" });
        }
    }
    catch (err) {
        res.status(500).json({ "message": `${err}` });
    }
});
exports.getMDList = getMDList;
