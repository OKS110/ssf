import { db } from './db.js';

// 고객 테이블 전체
export const getCustomers = async() => { // 수정 필요 : 테이블명, 컬럼명
    const sql = `
        select 
            customer_id, username
            email, phone, name, password, address, 
            additional_address, birth_date, status, gender, membership_level,
            loyalty_points, last_login, created_at, updated_at 
        from customers;
    `;

    const [result] = await db.execute(sql);
    
    return result;
}
//  고객 테이블에서 한 명 가져오기
export const getCustomer = async({username}) => { // 수정 필요 : 테이블명, 컬럼명
    const sql = `
        select 
            customer_id, username
            email, phone, name, password, address, 
            additional_address, birth_date, status, gender, membership_level,
            loyalty_points, last_login, created_at, updated_at 
        from customers
        where customer_id = ?;
    `;

    const [result] = await db.execute(sql, [username]);

    return result[0];
}