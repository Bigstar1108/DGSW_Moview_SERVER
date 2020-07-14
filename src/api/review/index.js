import express from 'express';
import authMiddleWare from '../../middleware/auth';
import * as reviewCtrl from './review.ctrl';

const review = express.Router();

review.post('/', authMiddleWare, reviewCtrl.WriteReview);
review.post('/author', reviewCtrl.getReviewByName);
review.post('/movieid', reviewCtrl.getReviewByMovieId);
review.get('/all', reviewCtrl.getAllReview);
review.put('/', authMiddleWare, reviewCtrl.UpdateReview);
review.delete('/', authMiddleWare, reviewCtrl.DeleteReview);

export default review;