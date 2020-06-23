import BaseJoi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiDate);

export const validateWriteReview = async(body) => {
    const schema = Joi.object().keys({
        author : Joi.string().required(),
        title : Joi.string().required(),
        content : Joi.string().required(),
        movieId : Joi.string().required(),
        movieName : Joi.string().required(),
        movieDate : Joi.string().required(),
        vote : Joi.string().required(),
    });

    try{
        return await schema.validateAsync(body);
    }catch (error){
        throw error;
    }
}

export const validateUpdateReview = async(body) => {
    const schema = Joi.object().keys({
        id : Joi.required(),
        title : Joi.string().required(),
        content : Joi.string().required(),
        vote : Joi.string().required(),
    });

    try{
        return await schema.validateAsync(body);
    }catch(error){
        throw error;
    }
}
