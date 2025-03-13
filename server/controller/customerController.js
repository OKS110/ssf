import * as repository from '../repository/customerRepository.js';

export const getCustomers = async(req, res) => {
    const result = await repository.getCustomers(req.body);
    // console.log(result);
    
    res.json(result);
    res.end();

}

export const getCustomer = async (req, res) => {
    // console.log(" 요청 바디 데이터:", req.body.username); //  요청 바디 확인

    const result = await repository.getCustomer(req.body.username);

    // console.log(" 고객 조회 결과:", result); //  SQL 결과 확인

    res.json(result);
    res.end();
};
