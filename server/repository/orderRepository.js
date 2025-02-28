import { db } from './db.js';

/**
 * ✅ 새로운 주문을 데이터베이스에 저장하는 함수
 * @param {Object} orderData - 주문 정보 객체
 * @returns {Object} 삽입된 주문 정보 반환
 */
export const addOrderItem = async (orderData) => {
    const sql = `
        INSERT INTO orders (
            customer_id, 
            order_number, 
            brand,
            title, 
            total_price, 
            size,
            color,
            quantity,
            zipcode,
            shipping_address, 
            delivery_message,
            detail_address, 
            status, 
            refund_amount, 
            order_date,
            payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?);
    `;

    try {
        // ✅ 주문번호 생성 (UUID 또는 특정 패턴 적용)
        const orderNumber = `ORD-${Date.now()}-${orderData.customer_id}`;

        // ✅ SQL 실행 (주문 데이터 삽입)
        const [result] = await db.execute(sql, [
            orderData.customer_id,  // 고객 ID
            orderNumber,            // 주문번호 (자동 생성)
            orderData.brand,        // 브랜드
            orderData.title,        // 상품명
            orderData.total_price,  // 주문 총 금액
            orderData.size,         //사이즈
            orderData.color,           //색상
            orderData.quantity,           //수량
            orderData.zipcode,      // 우편번호
            orderData.shipping_address, // 배송지 주소
            orderData.delivery_message, //배송메시지
            orderData.detail_address, // 상세 주소
            orderData.status || "Pending",      // 주문 상태 기본값 Pending
            orderData.refund_amount ?? 0,       // 환불금액 상태 기본값 0
            orderData.payment_method // 결제 방법
        ]);

        console.log("✅ 주문이 성공적으로 저장되었습니다.", result);

        // ✅ 삽입된 주문 정보 반환
        return result[0];

    } catch (error) {
        console.error("❌ 주문 생성 오류:", error);
        throw error;
    }
};


export const pullOrderList = async (id) => {
    const sql = `
        select * from orders where customer_id = ?;
    `;

    try {

        const [result] = await db.execute(sql, [id]);
        console.log(result);
        
        return result[0];

    } catch (error) {
        console.error("❌ 주문정보 가져오기 오류:", error);
        throw error;
    }
};


