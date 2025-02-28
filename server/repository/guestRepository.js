import { db } from './db.js';

export const getGuestList = async() => { 
    const sql = `
        select 
            gid, name, phone, email, address, created_at 
        from guests;
    `;

    const [result] = await db.execute(sql);

    return result[0];
}

export const getGuest = async({gid}) => { 
    const sql = `
        select gid, name, phone, email, address, created_at 
        from guests
        where gid = ?
    `;

    const [result] = await db.execute(sql, [gid]);

    return result[0];
};

export const addGuest = async (guestData) => {
    try {
        // 1️⃣ 먼저 동일한 name, email, phone이 있는지 확인
        const checkSql = `
            SELECT gid FROM guests WHERE name = ? AND email = ? AND phone = ?;
        `;
        const [existingGuest] = await db.execute(checkSql, [
            guestData.name, 
            guestData.email || null, 
            guestData.phone
        ]);

        if (existingGuest.length > 0) {
            console.log("✅ 기존 비회원 정보 있음:", existingGuest[0]);
            return { gid: existingGuest[0].gid }; // 기존 `gid` 반환
        }

        // 2️⃣ 중복이 없으면 새로운 비회원 정보 삽입
        const insertSql = `
            INSERT INTO guests (name, phone, email, address, zipcode, detail_address)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const [result] = await db.execute(insertSql, [
            guestData.name,
            guestData.phone,
            guestData.email || null,
            guestData.address || null,
            guestData.zipcode || null,
            guestData.detail_address || null
        ]);

        console.log("✅ 새로운 비회원 저장 완료:", result);
        return { gid: result.insertId }; // 신규 `gid` 반환
    } catch (error) {
        console.error("❌ 비회원 정보 저장 오류:", error);
        throw error;
    }
};


export const addGuestOrder = async (guestOrderData) => {
    const sql = `
        INSERT INTO guest_orders (
            guest_id, 
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
        const orderNumber = `G_ORD-${Date.now()}-${guestOrderData.guest_id}`;

        const [result] = await db.execute(sql, [
            guestOrderData.guest_id || null, // ✅ `guest_id`가 없으면 NULL 저장
            orderNumber,
            guestOrderData.brand,        // 브랜드
            guestOrderData.title,        // 상품명
            guestOrderData.total_price ?? 0,
            guestOrderData.size,         //사이즈
            guestOrderData.color,           //색상
            guestOrderData.quantity,           //수량
            guestOrderData.zipcode || null,
            guestOrderData.shipping_address || null,
            guestOrderData.delivery_message || null,
            guestOrderData.detail_address || null,
            guestOrderData.status || "Pending",
            guestOrderData.refund_amount ?? 0,
            guestOrderData.payment_method || null,
        ]);

        console.log("✅ guest_orders 저장 완료:", result);
        return { order_id: result.insertId, order_number: orderNumber, guest_id:guestOrderData.guest_id };
    } catch (error) {
        console.error("❌ guest_orders 저장 오류:", error);
        throw error;
    }
};