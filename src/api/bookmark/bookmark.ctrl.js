import models from '../../models';

export const findBookmark = async(req, res) => {
    const { body } = req;
    if(!body){
        const result = {
            status : 400,
            message : "영화 ID와 이름을 입력하세요!"
        };

        res.status(400).json(result);

        return;
    }
    try{
        const bookmark = await models.Bookmark.findBookmark(body.movieId, body.name);

        if(bookmark){
            const result = {
                status : 200,
                message : "즐겨찾기 된 영화입니다.",
                bookmark : true
            };

            res.status(200).json(result);

            return;
        }

        const result = {
            status : 200,
            message : "즐겨찾기 되지 않은 영화입니다.",
            bookmark : false
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

export const AddBookmark = async(req, res) => {
    const { body } = req;
    if(!body){
        const result = {
            status : 400,
            message : "영화 ID와 이름을 입력하세요!"
        };

        res.status(400).json(result);

        return;
    }
    try{
        const Bookmark = await models.Bookmark.findBookmark(body.movieId, body.name);

        if(Bookmark){
            const result = {
                status : 403,
                message : "이미 즐겨찾기 된 영화입니다."
            };

            res.status(403).json(result);

            return;
        }

        await models.Bookmark.create({
            ...body
        });

        const result = {
            status : 200,
            message : "즐겨찾기에 추가했습니다."
        };

        res.status(200).json(result);

        return;
    }catch(error){
        const result = {
            status : 500,
            message : "서버 에러!"
        };

        res.status(500).json(result);
    }
};

export const DeleteBookmark = async(req, res) => {
    const { id } = req.query;

    if(!id){
        const result = {
            status : 403,
            message : "id를 입력하세요."
        };

        res.status(403).json(result);

        return;
    }

    try{
        await models.Bookmark.DeleteBookmark(id);

        const result = {
            status : 200,
            message : `${id}번 째 북마트가 삭제되었습니다.`
        };

        res.status(200).json(result);

        return;
    }catch(error){
        const result = {
            status : 500,
            message : "서버 에러!"
        };

        res.status(500).json(result);
    }
};

export const getBookmark = async(req, res) => {
    const { name } = req.body;
    if(!name){
        const result = {
            status : 400,
            message : "이름을 입력하세요!"
        };

        res.status(400).json(result);

        return;
    }
    try{
        const member = await models.Member.findMemberByName(name);

        if(!member){
            const result = {
                status : 403,
                message : "가입되지 않은 회원이름입니다."
            };

            res.status(403).json(result);

            return;
        }

        const bookmark = await models.Bookmark.getBookmarkByName(name);

        const result = {
            status : 200,
            message : "즐겨찾기를 불러왔습니다.",
            results : bookmark,
            total_results : bookmark.length
        };

        res.status(200).json(result);
    }catch(error){
        const result = {
            status : 500,
            message : "서버 오류!"
        };

        res.status(500).json(result);
    }
};