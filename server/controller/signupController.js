import * as repository from '../repository/signupRepository.js';

//아이디 가져와서 중복체크
export const getId = async (req,res) => {
    const result = await repository.getId(req.body);
    res.json(result);
    res.end();
}

// 회원 등록
export const registCustomer = async(req,res) => {
    console.log(req.body.data.phone);
    
    let ph = req.body.data.phone.substring(0,3)
        .concat('-',req.body.data.phone.substring(3,7),'-',req.body.data.phone.substring(7,11));
            

    const data = {
        'id':req.body.data.id,
        'pwd':req.body.data.pwd,
        'username':req.body.data.username,
        'phone':ph,
        'address':req.body.adata.address,
        'email': req.body.data.email.concat('@',req.body.data.emailDomain) ,
        'zoneCode':req.body.adata.zoneCode,
        'addressDetail':req.body.data.addressDetail
    }
       

    const result = await repository.registCustomer(data);
    res.json(result);
    res.end();
}