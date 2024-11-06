import { Local } from "../environment/env";
import Address from "../models/Address";
import sendOTP from "../utils/mailer";
import User from "../models/User";
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const Security_Key:any = Local.SECRET_KEY;

const otpGenerator = () => {
    return String(Math.round(Math.random()*10000000000)).slice(0,6);
}

export const  registerUser = async (req:any, res:Response) => {
    try{
        const {firstname, lastname, doctype, email, password} = req.body;
        const isExist = await User.findOne({where:{email:email}});
        if(isExist){
            res.status(401).json("User already Exist");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({firstname,  lastname, doctype, email, password: hashedPassword});
        if(user){
            const OTP = otpGenerator();
            sendOTP(user.email, OTP);
            res.status(201).json({"OTP":OTP, "message":"Data Saved Successfully"});
        }
        else{
            res.status(403).json({"message":"Something Went Wrong"});
        }
    }
    catch(err){
        res.status(500).json({"message": err});
    }
}

export const verifyUser = async (req:any, res:Response) =>{
    try{
        const {email} = req.body;
        const user = await User.findOne({where:{email}});
        if(user){
            user.is_verified = true;
            user.save();
            res.status(200).json({"message": "User Verfied Successfully"});
        }
        else{
            res.status(403).json({"message":"Something Went Wrong"})
        }
    }
    catch(err){
        res.status(500).json({"message":err})
    }
}

export  const loginUser = async (req:any, res:Response) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where:{email}});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                if(user.is_verified){
                    const token = jwt.sign({uuid:user.uuid}, Security_Key);
                    res.status(200).json({"token":token, "user":user, "message":"Login Successfull"});
                }
                else{
                    const OTP = otpGenerator();
                    sendOTP(user.email, OTP);
                    res.status(200).json({"user":user, "OTP":OTP, "message": "OTP sent Successfully"});
                }
            }
            else{
                res.status(403).json({"message":"Invalid Password"});
            }
        }
        else{
            res.status(403).json({"message":"User doesn't Exist"});
        }
    }
    catch(err){
        res.status(500).json({"message":err});
    }
}

export const getUser = async (req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        const user = await User.findOne({where:{uuid:uuid}, include:Address});
        if(user){
            res.status(200).json({"user":user, "message":"User Found"});
        }
        else{
            res.status(404).json({"message":"User Not Found"})
        }
    }
    catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}