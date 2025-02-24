import { db } from './db.js';

/** 관리자 페이지 로그인 - select **/
// export const checkAdminLogin = async({id, pwd}) => { // 수정 필요 : 테이블명, 컬럼명
//     const sql = `
//         select count(*) as result_rows
//         from admins
//         where username = ? and password = ?
//     `;

//     const [result] = await db.execute(sql, [id, pwd]);

//     return result[0];
// }

// /** 관리자 페이지 고객 정보 호출 **/
// export const getCustomerData = async() => {
//     const sql = `
//         select customer_id,
//                 name,
//                 username,
//                 email,
//                 phone,
//                 address,
//                 left(birth_date, 10) as birth_date,
//                 membership_level
//         from customers
//     `;

//     const [result] = await db.execute(sql);

//     return result;
// }

// /** 관리자 페이지 상품 정보 호출 **/
// export const getProductData = async() => {
//     console.log('1111');

//     const sql = `
//         select  pid,
//                 category,
//                 sub_category,
//                 name,
//                 color,
//                 size,
//                 likes,
//                 star,
//                 stock,
//                 original_price,
//                 discount_rate,
//                 discounted_price
//         from products
//     `;

//     const [result] = await db.execute(sql);

//     return result;
// }

/** 상품 데이터 전체 호출 **/
export const getProductAll = async() => {
    const sql = `select pid,
                        category,
                        name as title,
                        image,
                        image->>'$[0]' as img,
                        likes,
                        star,
                        stock as reviewCount,
                        format(original_price, 0) as costprice,
                        discount_rate as discount,
                        format(discounted_price, 0) as saleprice,
                        brand
                from products`;

    const [result] = await db.execute(sql);

    return result;
}

/** 상품 아이디별 데이터 호출 **/
export const getItem = async({pid}) => {
    const sql = `
        select pid,
                category,
                sub_category,
                name as title,
                image,
                image->>'$[0]' as img,
                likes,
                star,
                stock as reviewCount,
                format(original_price, 0) as costprice,
                discount_rate as discount,
                format(discounted_price, 0) as saleprice,
                brand,
                size,
                color,
                delivery_fee as deliveryFee
        from products
        where pid = ?
    `;

    const [result] = await db.execute(sql, [pid]);
    
    return result[0];
}

// // 메인 상품 나열
// export const getCategoryItems = async() => {
//     const sql = `select pid,
//                         category,
//                         name as title,
//                         image->>'$[0]' as img,
//                         likes,
//                         star,
//                         stock as reviewCount,
//                         format(original_price, 0) as costprice,
//                         discount_rate as discount,
//                         format(discounted_price, 0) as saleprice
//                 from products`;

//     const [result] = await db.execute(sql);

//     return result;
// }

// export const getRankItems = async() => {
//     const sql = `
//         select pid,
//                 category,
//                 name as title,
//                 image->>'$[0]' as img,
//                 likes,
//                 star,
//                 stock as reviewCount,
//                 format(original_price, 0) as costprice,
//                 discount_rate as discount,
//                 format(discounted_price, 0) as saleprice
//         from products
//         order by likes
//     `;

//     const [result] = await db.execute(sql);

//     return result;
// }