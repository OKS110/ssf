import * as repository from '../repository/customerRepository.js';

export const getCustomers = async(req, res) => {
    
    const result = await repository.getCustomers(req.body);
    // console.log(result);
    
    res.json(result);
    res.end();

}

export const getCustomer = async (req, res) => {
    console.log("🚀 요청된 데이터:", req.body); // ✅ `req.body` 값 확인
    console.log("🚀 username 값:", req.body.username); // ✅ `username`이 존재하는지 확인

    if (!req.body.username) {
        return res.status(400).json({ error: "username 값이 없습니다." });
    }

    try {
        const result = await repository.getCustomer(req.body.username);
        console.log("✅ 고객 조회 결과:", result);
        res.json(result);
    } catch (error) {
        console.error("❌ 데이터베이스 에러:", error);
        res.status(500).json({ error: "서버 내부 오류 발생" });
    }
};
