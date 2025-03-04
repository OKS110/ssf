import { db } from "./db.js";

// 아이디 번호 호출
export const getCustomerId = async({id}) => {
    const sql = `
        select customer_id
        from customers
        where username = ?
    `;

    const [result] = await db.execute(sql, [id]);

    return result[0];
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
// export const getCartItems = async({userId}) => {
//     const sql = `
//         select product_id,
//             size,
//             color,
//             quantity
//         from cart
//         where customer_id = ?
//     `;

//     console.log("repository :: userId --> ", userId);
// }