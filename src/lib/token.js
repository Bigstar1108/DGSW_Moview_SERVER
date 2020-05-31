import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

// create token
export const createToken = async(memberId, memberName) => {
    const payload = {
        memberId, memberName
    };

    const option = { expiresIn : '5 days', issuer : 'Movview', subject : 'token' }

    try{
        return jwt.sign(payload, secret, option);
    }catch(error){
        throw error;
    }
};

// refresh token
export const createRefreshToken = async(memberId, memberName) => {
    const payload = {
        memberId, memberName
    };
    
    const option = { expiresIn : '7 days', issuer : 'Movview', subject : 'token' }

    try{
        return jwt.sign(payload, secret, option);
    }catch(error){
        throw error;
    }
};

// verify token
export const verifyToken = async(token) => {
    try{
        return await jwt.verify(token, secret);
    }catch(error){
        throw error;
    }
};