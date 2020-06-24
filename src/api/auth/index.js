import express from 'express';
import * as authCtrl from './auth.ctrl';
//import authMiddleWare from '../../middleware/auth';
const auth = express.Router();

auth.post('/login', authCtrl.login);
auth.post('/register', authCtrl.registerMember);
auth.post('/find/id', authCtrl.validateId);
auth.post('/find/name', authCtrl.validateName);
auth.delete('/delete', authCtrl.deleteMember);

export default auth;