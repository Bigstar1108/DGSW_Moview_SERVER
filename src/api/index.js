import express from 'express';
const router = express.Router();

import auth from './auth';
import review from './review';

router.use('/auth', auth);
router.use('/review', review);

export default router;