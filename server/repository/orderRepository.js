import { db } from './db.js';

/**
 * ✅ 새로운 주문을 데이터베이스에 저장하는 함수
 * @param {Object} orderData - 주문 정보 객체
 * @returns {Object} 삽입된 주문 정보 반환
 */
export const addOrderItem = async (orderDataList) => {
    try {
        const orderResults = []; // ✅ 여러 개 주문 ID 저장
        const orderNumber = `ORD-${Date.now()}-${orderDataList[0].customer_id}`; // ✅ 동일 주문 번호 적용

        for (const orderData of orderDataList) {
            // ✅ 1️⃣ 중복 주문 확인 (customer_id + title + size + color)
            const [existingOrders] = await db.execute(
                `SELECT COUNT(*) as count 
                 FROM orders 
                 WHERE customer_id = ? 
                   AND title = ? 
                   AND size = ? 
                   AND color = ? 
                   AND status = 'Pending'`,
                [orderData.customer_id, orderData.title, orderData.size, orderData.color]
            );

            if (existingOrders[0].count > 0) {
                console.warn(`⚠️ 중복 주문 발견 (customer_id: ${orderData.customer_id}, title: ${orderData.title}, size: ${orderData.size}, color: ${orderData.color})`);
                continue; // ✅ 중복된 주문이면 INSERT 실행 안 함
            }

            // ✅ 2️⃣ 중복이 없을 경우 주문 추가
            const sql = `
                INSERT INTO orders (
                    customer_id, order_number, brand, title, total_price, size, color, quantity,
                    zipcode, shipping_address, delivery_message, detail_address,
                    status, refund_amount, order_date, payment_method
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?);
            `;

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
        return { success: true, orderIds: orderResults };

    } catch (error) {
        console.error("❌ 주문 생성 오류:", error);
        return { success: false, error };
    }
};




export const pullOrderList = async (user_id) => {
    try {
        // 1️⃣ customers 테이블에서 customer_id 가져오기
        const customerSql = `SELECT customer_id FROM customers WHERE username = ?`;
        const [customerResult] = await db.execute(customerSql, [user_id]);

        if (customerResult.length === 0) {
            console.warn(`❌ user_id(${user_id})에 해당하는 customer_id가 없음.`);
            return [];
        }

        const customer_id = customerResult[0].customer_id;
        console.log(`🟢 user_id(${user_id}) → customer_id(${customer_id}) 매핑 완료`);

        // 2️⃣ orders 테이블에서 customer_id로 주문 목록 조회 (products와 JOIN)
        const orderSql = `
            SELECT o.*, p.image, p.pid as product_id
            FROM orders o
            LEFT JOIN products p ON LOWER(TRIM(o.title)) = LOWER(TRIM(p.name))
            WHERE o.customer_id = ?
            ORDER BY o.order_date DESC;
        `;

        const [orders] = await db.execute(orderSql, [customer_id]);
        console.log("🔵 회원 주문 조회 결과:", orders);
        return orders;

    } catch (error) {
        console.error("❌ 회원 주문 조회 오류:", error);
        return [];
    }
};

// 장바구니에서 주문페이지로 넘어가고 주문할 때 중복처리 필요함
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

export const deleteOrder = async (oid) => {
    const sql = `DELETE FROM orders WHERE oid = ?`;

    try {
        const [result] = await db.execute(sql, [oid]);
        console.log(`✅ 주문 취소 완료: oid=${oid}, 삭제된 행 수=${result.affectedRows}`);
        return result;
    } catch (error) {
        console.error("❌ 주문 삭제 오류:", error);
        throw error;
    }
};
