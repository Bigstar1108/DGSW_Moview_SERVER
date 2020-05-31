import models from '../../models';
import * as validate from '../../lib/Validate/auth';
import * as token from '../../lib/token';

//로그인
export const login = async(req, res) => {
    const { body } = req;
    try{
        await validate.validateLogin(body);
    }catch(error){
        const result = {
            status : 400,
            message : 'login validate error!',
        }

        res.status(400).json(result);

        return;
    }

    const { id, pw } = body;

    const member = await models.Member.findMemberForLogin(id, pw);

    if(!member){
        const result = {
            status : 403,
            message : 'not found member!'
        }

        res.status(403).json(result);

        return;
    }

    const tokenData = await token.createToken(member.id, member.Name);

    try{
        const result = {
            status : 200,
            message : "로그인 성공!",
            data : {
                tokenData,
                member
            }
        }

        res.status(200).json(result);
    }catch(error){
        const result = {
            status : 500,
            message : "서버 에러!"
        }

        res.status(500).json(result);
    }
};

//회원가입
export const registerMember = async(req, res) => {
    const { body } = req;

    try{
        await validate.validateRegister(body);
    }catch(error){
        const result = {
            status : 400,
            message : '회원가입 양식 오류!',
        }

        res.status(400).json(result);

        return;
    }

    try{
        const addData = {
            ...body,
        };
        const memberId = await models.Member.findMemberById(addData.id);
        const memberName = await models.Member.findMemberByName(addData.Name);

        if(memberId){
            const result = {
                status : 403,
                message : "이미 가입 된 사용자 Id 입니다.",
            }

            res.status(403).json(result);

            return;
        }else if(memberName){
            const result = {
                status : 403,
                message : "이미 가입 된 사용자 이름 입니다.",
            }

            res.status(403).json(result);

            return;
        }

        await models.Member.create({
            ...body
        });

        const result = {
            status : 200,
            message : "회원가입 성공!"
        }

        res.status(200).json(result);
    }catch(error){
        const result = {
            status : 500,
            message : "서버 에러!",
        }

        res.status(500).json(result);
    }
};

//중복 id 체크
export const validateId = async(req, res) => {
    const { id } = req.body;
    if(!id){
        const result = {
            status : 400,
            message : "id를 입력하세요!"
        }
        
        res.status(400).json(result);

        return;
    }
    try{
        const memberId = await models.Member.findMemberById(id);

        if(memberId){
            const result = {
                status : 403,
                message : '이미 가입된 ID'
            }

            res.status(403).json(result);

            return;
        }

        const result = {
            status : 200,
            message : "사용 가능한 ID 입니다."
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

export const validateName = async(req, res) => {
    const { Name } = req.body;
    if(!Name){
        const result = {
            status : 400,
            message : "이름을 입력하세요!"
        }
        
        res.status(400).json(result);

        return;
    }
    try{
        const memberName = await models.Member.findMemberByName(Name);

        if(memberName){
            const result = {
                status : 403,
                message : '이미 가입된 Name'
            }

            res.status(403).json(result);

            return;
        }

        const result = {
            status : 200,
            message : "사용 가능한 Name 입니다."
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

export const deleteMember = async(req, res) => {
    const { id } = req.body;
    if(!id){
        const result = {
            status : 400,
            message : "id를 입력하세요!"
        }
        
        res.status(400).json(result);

        return;
    }
    try{
        const memberId = await models.Member.findMemberById(id);

        if(!memberId){
            const result = {
                status : 403,
                message : "이미 삭제 된 ID"
            }

            res.status(403).json(result);

            return;
        }

        const result = {
            status : 200,
            message : `${id} 회원정보가 삭제되었습니다.`
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