import { db } from './db.js';

export const getGuestList = async() => { // 수정 필요 : 테이블명, 컬럼명
    const sql = `
        select 
            gid, name, phone, order_number, email, address, created_at 
        from guests;
    `;

    const [result] = await db.execute(sql);

    return result[0];
}

export const getGuest = async({gid}) => { // 수정 필요 : 테이블명, 컬럼명
    const sql = `
        select gid, name, phone, order_number, email, address, created_at 
        from guests
        where gid = ?
    `;

    const [result] = await db.execute(sql, [gid]);

    return result[0];
}