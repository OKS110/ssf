import { db } from "./db.js";

// 아이디 번호 호출
export const getCustomerId = async({id}) => {
    const sql = `
        select customer_id
        from customers
        where username = ?
    `;

    const [result] = await db.execute(sql, [id]);

    console.log("respository :: result --> ", result[0].customer_id);

    return result[0].customer_id;
}

// 카트 상품 추가
export const saveToCart = async(formData) => {
    const sql = `
        insert into cart(customer_id, product_id, quantity, size, color, added_at)
        values (?, ?, ?, ?, ?,  now())
    `;

    const values = [
        formData.id, // 숫자 아이디(username아님)
        formData.pid,
        formData.count,
        formData.size,
        formData.color
    ];

    const result = await db.execute(sql, values);

    return { "result_row": result[0].affectedRows};
}

// 아이디별 카트 상품 호출
export const getCartItems = async({id}) => {
    const sql = `
        select c.cid,
                c.customer_id,
                c.product_id,
                c.quantity,
                c.size,
                c.color,
                p.brand,
                p.name,
                format(p.original_price, 0) as original_price,
                p.discount_rate,
                format(p.discounted_price, 0) as discounted_price,
                p.image ->> '$[0]' as image
        from cart c, products p
        where c.product_id = p.pid
            and c.customer_id = ?
    `;

    // console.log("repository :: id --> ", id);
    const [result] = await db.execute(sql, [id]);
    // console.log("respository :: result --> ", result);

    return result;
}

// 상품 상세 페이지 수량 업데이트
export const updateDetailQty = async({cid, type, count}) => {
    const str = type === "increase" && `quantity = quantity+${count}`;
    
    const sql = `
        update cart
            set ${str}
        where cid = ?
    `;

    const [result] = await db.execute(sql, [cid]);

    // console.log("repository :: qty result -->", result.affectedRows);

    return {"result_row": result.affectedRows};
}

// 장바구니 페이지 상품 수량 변경
export const changeQty = async({cid, count}) => {
    const sql = `
        update cart
            set quantity = ${count}
        where cid = ?
    `;

    const [result] = await db.execute(sql, [cid]);

    console.log("repository :: qty result -->", result.affectedRows);
}