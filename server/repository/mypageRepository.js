import { db } from "./db.js";

export const getMyinfo = async ({ id }) => { // 이거 안씀 겟 커스터머 사용중임

    const sql1 = `
                select customer_id,
                    name, email, phone,password,address, username
                     from customers 
                     where username=?
                `;

    const [result] = await db.execute(sql1, [id]);

    return result[0];
}
// =======================================================

export const updateMyinfo = async ({ id, colName, value }) => {

    if (colName === 'phone') {
        const ph = value.substring(0, 3)
            .concat('-', value.substring(3, 7), '-', value.substring(7, 11));
        const sql = `update customers set ${colName} = ? where username = ? `;
        console.log(sql);
        const [result] = await db.execute(sql, [ph, id]);
        return { 'result': result.affectedRows };
    }
    else {
        const sql = `update customers set ${colName} = ? where username = ? `;
        console.log(sql);
        const [result] = await db.execute(sql, [value, id]);
        return { 'result': result.affectedRows };

    }
}
export const updateMyinfo2 = async ({ id, colName, value, colName2, value2 }) => {
    if (colName2 === 'emailDomain') {
        const em = value.concat('@', value2);
        const sql = `update customers set ${colName} = ? where username = ? `;
        console.log(sql);
        const [result] = await db.execute(sql, [em, id]);
        return { 'result': result.affectedRows };
    }
    else if (colName2 === 'extra') {
        const zipcode = value.substring(0, 5);
        const address = value.replace(zipcode, '');
        const sql = `update customers set zipcode = ?, address = ?, additional_address = ? where username = ? `
        console.log(sql);
        const [result] = await db.execute(sql, [zipcode, address, value2, id]);
        return { 'result': result.affectedRows };
    }
}


export const updateDelivery = async ({ deliForm, id }) => {

    const sql1 = `
               update customers set name = ? , phone = ?, zipcode = ?, address = ?, detail_address = ? where username = ?
                `;

    const [result] = await db.execute(sql1, [deliForm.name, deliForm.phone, deliForm.zoneCode, deliForm.address, deliForm.extraAddress, id]);

    return { 'result': result.affectedRows };
}


// 배송지 추가 개별   
export const updateDeliveryExtra = async (all, id) => {

    const sql1 = `
            update customers set additional_address =?  where username = ?
     `;
    const [result] = await db.execute(sql1, [all, id]);
    return { 'result': result.affectedRows };
}


// 배송지 개별 삭제
export const deleteDelivery = async ({ id }) => {
    const sql = `
            update customers    
                  set additional_address = null 
                           where username = ? 
                `;

    const result = await db.execute(sql, [id]);
    return result;
}

export const addLike = async (cid,pid) => {
    const sql = `
               insert into favorites( customer_id, product_id ) 
               values( ?, ?)
                    `;

    const [result] = await db.execute(sql, [cid,pid]);
    
    return result[0];
}

export const deleteLike = async (cid,pid) => {
    const sql = `
               delete from favorites where customer_id = ? and product_id =?
                    `;

    const [result] = await db.execute(sql, [cid,pid]);
    
    return { 'result': result.affectedRows };
}

export const getAllLike = async (cid) => {
    const sql = `
               select fid, customer_id, product_id
                from favorites 
                where customer_id = ?
               
                    `;
    const [result] = await db.execute(sql,[cid]);
    
    return result;
}