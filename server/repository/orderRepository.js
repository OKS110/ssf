import { db } from './db.js';

/**
 * ✅ 새로운 주문을 데이터베이스에 저장하는 함수
 * @param {Object} orderData - 주문 정보 객체
 * @returns {Object} 삽입된 주문 정보 반환
 */
export const addOrderItem = async (orderDataList) => {
    const sql = `
        INSERT INTO orders (
            customer_id, order_number, brand, title, total_price, size, color, quantity,
            zipcode, shipping_address, delivery_message, detail_address,
            status, refund_amount, order_date, payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?);
    `;

    try {
        const orderResults = []; // ✅ 여러 개 주문 ID 저장

        for (const orderData of orderDataList) {
            const orderNumber = `ORD-${Date.now()}-${orderData.customer_id}`;

            const [result] = await db.execute(sql, [
                orderData.customer_id, orderNumber, orderData.brand, orderData.title,
                orderData.total_price, orderData.size, orderData.color, orderData.quantity,
                orderData.zipcode, orderData.shipping_address, orderData.delivery_message,
                orderData.detail_address, orderData.status || "Pending", orderData.refund_amount ?? 0,
                orderData.payment_method
            ]);

            orderResults.push(result.insertId); // ✅ 삽입된 주문 ID 저장
        }

        console.log("✅ 모든 주문 성공적으로 저장됨:", orderResults);
        return { success: true, orderIds: orderResults }; // ✅ 여러 개 주문 ID 반환

    } catch (error) {
        console.error("❌ 주문 생성 오류:", error);
        return { success: false, error };
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


export const addCartOrders = async (orders) => {
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
        ) VALUES ?
    `;

    const values = orders.map(order => [
        order.customer_id,  
        `ORD-${Date.now()}-${order.customer_id}`,  
        order.brand,  
        order.title,  
        order.total_price,  
        order.size,  
        order.color,  
        order.quantity,  
        order.zipcode,  
        order.shipping_address,  
        order.delivery_message,  
        order.detail_address,  
        order.status || "Pending",  
        order.refund_amount || 0,  
        new Date(),  
        order.payment_method
    ]);

    try {
        const [result] = await db.query(sql, [values]);
        console.log(`✅ 장바구니 주문 저장 완료 (${result.affectedRows}개 주문)`);
        return { success: true, affectedRows: result.affectedRows };
    } catch (error) {
        console.error("❌ 장바구니 주문 저장 오류:", error);
        throw error;
    }
};

export const getCartOrderItems = async (selectedCids) => {
    const placeholders = selectedCids.map(() => "?").join(",");
    const sql = `
        SELECT c.cid, c.product_id, c.quantity, c.size, c.color, 
               p.brand, p.name, p.original_price, p.discounted_price, p.image, p.discount_rate, p.delivery_fee
        FROM cart c
        JOIN products p ON c.product_id = p.pid
        WHERE c.cid IN (${placeholders})
    `;

    const [result] = await db.execute(sql, selectedCids);
    return result;
};

// ✅ 주문된 상품을 cart 테이블에서 삭제
export const deleteOrderedCartItems = async (customer_id, orderedItems) => {
    console.log("📌 [DEBUG] 삭제할 주문 상품:", orderedItems);

    try {
        for (const item of orderedItems) {
            const sql = `
                DELETE FROM cart
                WHERE customer_id = ? 
                AND product_id = ? 
                AND size = ? 
                AND color = ?
            `;
            await db.execute(sql, [customer_id, item.product_id, item.size, item.color]);
        }

        console.log("✅ 주문된 상품들이 장바구니에서 삭제됨!");
        return { message: "주문된 상품들이 장바구니에서 삭제되었습니다." };
    } catch (error) {
        console.error("❌ 장바구니에서 주문된 상품 삭제 실패:", error);
        throw error;
    }
};