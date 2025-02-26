import { db } from './db.js';

/**
 * ✅ 새로운 주문을 데이터베이스에 저장하는 함수
 * @param {Object} orderData - 주문 정보 객체
 * @returns {Object} 삽입된 주문 정보 반환
 */
export const orderItem = async (orderData) => {
    const sql = `
        INSERT INTO orders (
            customer_id, 
            order_number, 
            total_price, 
            zipcode,
            shipping_address, 
            detail_address, 
            status, 
            refund_amount, 
            guest_id,
            payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    try {
        // ✅ 주문번호 생성 (UUID 또는 특정 패턴 적용)
        const orderNumber = `ORD-${Date.now()}-${orderData.customer_id}`;

        // ✅ SQL 실행 (주문 데이터 삽입)
        const [result] = await db.execute(sql, [
            orderData.customer_id,  // 고객 ID
            orderNumber,            // 주문번호 (자동 생성)
            orderData.total_price,  // 주문 총 금액
            orderData.zipcode,      // 우편번호
            orderData.shipping_address, // 배송지 주소
            orderData.detail_address, // 상세 주소
            'Pending',              // 주문 상태 (기본값)
            0,                      // 환불 금액 (기본값)
            orderData.guest_id,     //게스트 ID
            orderData.payment_method // 결제 방법
        ]);

        console.log("✅ 주문이 성공적으로 저장되었습니다.", result);

        // ✅ 삽입된 주문 정보 반환
        return {
            order_id: result.insertId, // 자동 생성된 주문 ID
            order_number: orderNumber
        };

    } catch (error) {
        console.error("❌ 주문 생성 오류:", error);
        throw error;
    }
};
