import { db } from "./db.js";

/** ✅ 리뷰 저장 + 주문 상태 업데이트 */
export const addReview = async (customer_id, product_id, order_id, rating, review_text, status) => {
    const connection = await db.getConnection(); // ✅ 트랜잭션 시작
    await connection.beginTransaction();

    try {
        // ✅ 1️⃣ 리뷰 저장
        const reviewSql = `
            INSERT INTO reviews (customer_id, product_id, order_id, rating, review_text, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        const [reviewResult] = await connection.execute(reviewSql, [
            Number(customer_id),
            Number(product_id),
            Number(order_id),
            Number(rating),
            review_text || "",
            status || "Pending"
        ]);

        // ✅ 2️⃣ 주문 테이블 `status` 업데이트
        const orderSql = `UPDATE orders SET status = 'Reviewed' WHERE oid = ?`;
        const [orderUpdateResult] = await connection.execute(orderSql, [Number(order_id)]);

        await connection.commit(); // ✅ 트랜잭션 커밋
        connection.release();

        return { reviewInserted: reviewResult.affectedRows > 0, orderUpdated: orderUpdateResult.affectedRows > 0 };
    } catch (error) {
        await connection.rollback(); // ❌ 오류 발생 시 롤백
        connection.release();
        console.error("❌ 리뷰 저장 및 주문 상태 업데이트 오류:", error);
        throw error;
    }
};
