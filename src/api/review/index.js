import express from 'express';
import authMiddleWare from '../../middleware/auth';
import * as reviewCtrl from './review.ctrl';

const review = express.Router();

review.post('/', authMiddleWare, reviewCtrl.WriteReview);
review.get('/author', reviewCtrl.getReviewByName);
review.get('/movieid', reviewCtrl.getReviewByMovieId);
review.put('/', authMiddleWare, reviewCtrl.UpdateReview);
review.delete('/', authMiddleWare, reviewCtrl.DeleteReview);

export default review;