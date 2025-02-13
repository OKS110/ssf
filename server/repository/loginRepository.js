import { db } from './db.js';

/** 로그인 - select **/
export const checkUserLogin = async({id, pwd}) => { // 수정 필요 : 테이블명, 컬럼명
    const sql = `
        select count(*) as result_rows
        from customers
        where username = ? and password = ?
    `;

    const [result] = await db.execute(sql, [id, pwd]);

    return result[0];
}