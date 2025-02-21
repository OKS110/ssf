import * as repository from '../repository/signupRepository.js';

//아이디 가져와서 중복체크
export const getId = async (req,res) => {
    const result = await repository.getId(req.body);
    res.json(result);
    res.end();
}

// 회원 등록
export const registCustomer = async(req,res) => {
    console.log('회원가입',req.body);

    const data = {
        'id':req.body.id,
        'pwd':req.body.pwd,
        'username':req.body.username,
        'phone':req.body.phone,
        'address':req.body.address,
        'email': req.body.email.concat('@',req.body.emailDomain) 
    }
    
    const result = await repository.registCustomer(data);
    res.json(result);
    res.end();
}