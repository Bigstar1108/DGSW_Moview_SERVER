import models from '../../models';
import * as validate from '../../lib/Validate/review';

export const WriteReview = async(req, res) => {
    const { body } = req;
    try{
        await validate.validateWriteReview(body);
    }catch(error){
        const result = {
            status : 400,
            message : 'review write validate error!',
        }

        res.status(400).json(result);

        return;
    }

    try{
        const Author = await models.Member.findMemberByName(body.author);

        if(!Author){
            const result = {
                status : 403,
                message : "가입되지 않은 회원의 이름입니다."
            };

            res.status(403).json(result);

            return;
        }

        await models.Review.create({
            ...body
        });

        const result = {
            status : 200,
            message : "리뷰 작성을 성공했습니다"
        };

        res.status(200).json(result);

        return;
    }catch(error){
        const result = {
            status : 500,
            message : "서버 에러!"
        }

        res.status(500).json(result);
    }
};

export const UpdateReview = async(req, res) => {
    const { body } = req;
    try{
        await validate.validateUpdateReview(body);
    }catch(error){
        const result = {
            status : 400,
            message : 'review update validate error!'
        };

        res.status(400).json(result);

        return;
    }

    try{
        await models.Review.update({
            ...body
        }, {
            where : {id : body.id}
        });

        const result = {
            status : 200,
            message : "리뷰 수정을 성공했습니다."
        };

        res.status(200).json(result);

        return;
    }catch(error){
        console.log(error);
        const result = {
            status : 500,
            message : "서버 에러!"
        }

        res.status(500).json(result);
    }
};

export const DeleteReview = async(req, res) => {
    const { id } = req.query;

    if(!id){
        const result = {
            status : 400,
            message : "id를 입력하세요."
        };

        res.status(400).json(result);

        return;
    }

    try{
        await models.Review.deleteReviewById(id);

        const result = {
            status : 200,
            message : `${id}번 째 리뷰가 삭제되었습니다.`
        };

        res.status(200).json(result);

        return;
    }catch(error){
        console.log(error);
        const result = {
            status : 500,
            message : "서버 에러!"
        };

        res.status(500).json(result);
    }
};

export const getReviewByName = async(req, res) => {
    const { author } = req.body;
    if(!author){
        const result = {
            status : 400,
            message : "Author를 입력하세요!"
        }

        res.status(400).json(result);

        return;
    }
    try{
        const Author = await models.Member.findMemberByName(author);

        if(!Author){
            const result = {
                status : 403,
                message : "가입되지 않은 회원의 이름입니다."
            }

            res.status(403).json(result);

            return;
        }

        const reviews = await models.Review.findReviewByName(author);

        const result = {
            status : 200,
            message : `${author}의 리뷰를 불러왔습니다.`,
            results : reviews,
            total_results : reviews.length
        }

        res.status(200).json(result);
    }catch(error){
        const result = {
            status : 500,
            message : "서버 오류!"
        }

        res.status(500).json(result);
    }
};

export const getReviewByMovieId = async(req, res) => {
    const { movieId } = req.body;
    if(!movieId){
        const result = {
            status : 400,
            message : "MovieId를 입력하세요!"
        };

        res.status(400).json(result);

        return;
    }
    try{
        const reviews = await models.Review.findReviewByMovieId(movieId);

        const result = {
            status : 200,
            message : `${movieId}의 리뷰를 불러왔습니다.`,
            results : reviews
        }

        res.status(200).json(result);
    }catch(error){
        const result = {
            status : 500,
            message : "서버 오류!"
        }

        res.status(500).json(result);
    }
};

export const getAllReview = async(req, res) => {
    try{
        const reviews = await models.Review.getAllReview();

        const result = {
            status : 200,
            message : "모든 리뷰를 불러왔습니다.",
            results : reviews,
            total_results : reviews.length
        }

        res.status(200).json(result);
    }catch(error){
        console.log(error);
        const result = {
            status : 500,
            message : "서버 오류!"
        }

        res.status(500).json(result);
    }
};