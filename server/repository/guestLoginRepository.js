import { db } from './db.js';

export const checkGuestLogin = async (guest) => {
    // ✅ undefined 값을 방지하기 위해 기본값 `null` 설정

    console.log("📌 SQL 실행 전 값 확인:", guest.name, guest.phone, guest.order_number ); // 디버깅 로그 추가

    const sql = `
        SELECT 
            go.*, 
            g.name, 
            g.phone, 
            g.email, 
            g.address, 
            g.zipcode, 
            g.detail_address
        FROM guest_orders AS go
        JOIN guests AS g ON go.guest_id = g.gid
        WHERE g.name = ? AND g.phone = ? AND go.order_number = ?;
    `;

    try {
        const [result] = await db.execute(sql, [guest.name, guest.phone, guest.order_number]);
        console.log("✅ DB 조회 결과:", result);
        return result.length > 0 ? { result_rows: 1, ...result[0] } : { result_rows: 0 };
    } catch (error) {
        console.error("❌ SQL 실행 오류:", error);
        throw error;
    }
};
