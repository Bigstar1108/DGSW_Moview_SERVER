import BaseJoi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiDate);

export const validateLogin = async(body) => {
    const schema = Joi.object().keys({
        id : Joi.string().required(),
        pw : Joi.string().required(),
    });

    try{
        return await schema.validateAsync(body);
    }catch(error){
        throw error;
    }
}

export const validateRegister = async(body) => {
    const schema = Joi.object().keys({
        id : Joi.string().required(),
        pw : Joi.string().required(),
        Name : Joi.string().required()
    });

    try{
        return await schema.validateAsync(body);
    }catch(error){
        throw error;
    }
}