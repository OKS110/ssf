import { db } from './db.js';

/** 로그인 - select **/
export const checkGuestLogin = async({guestNm, mobileNo, ordNo}) => { // 수정 필요 : 테이블명, 컬럼명
    const sql = `
        select count(*) as result_rows
            from guests
        where name = ? and phone = ? and order_number = ?;
    `;

    const [result] = await db.execute(sql, [guestNm, mobileNo, ordNo]);
    console.log("DB 조회 결과:", result); // 추가된 디버깅 로그
    return result[0];
}
// 홍길동, 01012345678, abc1234