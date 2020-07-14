import express from 'express';
const router = express.Router();

import auth from './auth';
import review from './review';
import event from './event';
import bookmark from './bookmark';

router.use('/auth', auth);
router.use('/review', review);
router.use('/event', event);
router.use('/bookmark', bookmark);

export default router;