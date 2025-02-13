import * as repository from '../repository/loginRepository.js';
import jwt from 'jsonwebtoken';

/** 관리자 페이지 로그인 - checkAdminLogin **/
export const checkUserLogin = async(req, res) => {
    let result = await repository.checkUserLogin(req.body);

    if(result.result_rows === 1) {
        const token = jwt.sign({"userId": req.body.username}, '7mPjPeZ7Ul');
        result = {...result, "token": token};
    }

    res.json(result);
    res.end();
}