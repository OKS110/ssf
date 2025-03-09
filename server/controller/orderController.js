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

export const addCartOrders = async (req, res) => {
    try {
        const { orders } = req.body; // 장바구니에서 주문할 상품들 (배열 형태)

        if (!orders || orders.length === 0) {
            return res.status(400).json({ error: "주문할 상품이 없습니다." });
        }

        const result = await repository.addCartOrders(orders);
        res.json(result);
    } catch (error) {
        console.error("❌ 장바구니 주문 저장 실패:", error);
        res.status(500).json({ error: "장바구니 주문 저장 실패" });
    }
};

export const getCartOrderItems = async (req, res) => {
    const { cids } = req.body;

    if (!cids || cids.length === 0) {
        return res.status(400).json({ message: "선택된 상품이 없습니다." });
    }

    const result = await repository.getCartOrderItems(cids);
    res.json(result);
};

// ✅ 주문된 상품을 cart 테이블에서 삭제하는 함수
export const deleteOrderedCartItems = async (req, res) => {
    try {
        const { customer_id, orderedItems } = req.body;
        console.log("📌 [DEBUG] 장바구니에서 삭제할 상품:", orderedItems);

        const result = await repository.deleteOrderedCartItems(customer_id, orderedItems);
        res.json(result);
    } catch (error) {
        console.error("❌ 장바구니에서 주문된 상품 삭제 실패:", error);
        res.status(500).json({ error: "장바구니에서 주문된 상품 삭제 실패" });
    }
};