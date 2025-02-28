import * as repository from '../repository/orderRepository.js';

export const addOrderItem = async(req, res) => {
    console.log("📌 [DEBUG] 요청된 orderData:", req.body); // ✅ 디버깅용 로그 추가
    const result = await repository.addOrderItem(req.body);
    res.json(result);
    res.end();
}

export const pullOrderList = async(req, res) => {
    console.log("📌 [DEBUG] 해당하는 아이디 주문 정보 요청:", req.body.id); // ✅ 디버깅용 로그 추가
    const result = await repository.pullOrderList(req.body.id);
    res.json(result);
    res.end();
}
