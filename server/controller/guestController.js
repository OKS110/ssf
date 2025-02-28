import * as repository from '../repository/guestRepository.js';

export const getGuestList = async(req, res) => {
    const result = await repository.getGuestList(req.body);
    console.log("비회원 리스트", result);
    
    res.json(result);
    res.end();
}

export const getGuest = async(req, res) => {
    const result = await repository.getGuest(req.body);
    res.json(result);
    res.end();
}

export const addGuest = async (req, res) => { //비회원 테이블 업데이트(추가) 
    try {
        const guestData = req.body;
        console.log("guestData", guestData);
        
        const newGuest = await repository.addGuest(guestData);
        console.log("newGuest", newGuest);
        
        res.json(newGuest);
    } catch (error) {
        console.error("❌ 비회원 추가 오류:", error);
        res.status(500).json({ error: "비회원 추가 실패" });
    }
};

export const addGuestOrder = async (req, res) => { // 비회원 주문 테이블 업데이트(추가)
    try {
        console.log("📌 [DEBUG] guest_orders 요청 데이터:", req.body); // ✅ 디버깅 추가

        const guestOrderData = req.body;
        const newGuestOrder = await repository.addGuestOrder(guestOrderData);

        console.log("✅ 비회원 주문 저장 완료:", newGuestOrder);
        res.json(newGuestOrder);
    } catch (error) {
        console.error("❌ guest_orders 저장 오류:", error);
        res.status(500).json({ error: "guest_orders 저장 실패" });
    }
};