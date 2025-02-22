import {db} from './db.js';

//db에서 아이디가져와서 중복확인 진행
export const getId = async({id}) => {
    const sql = `
                select  
                    count(*) as count 
                from customers 
                where username = ?
                `;
    
    const [result] = await db.execute(sql,[id]);
    console.log('idcheckresult',result[0]);
    
    return result[0];
}

// 회원가입폼 db 저장
export const registCustomer = async(data) => {
    
    // console.log('teste',data);
    
    const sql = `
                insert into customers(
                        username, 
                        email, 
                        phone, 
                        name, 
                        password, 
                        address
                        )
                    values(
                    ?,?,?,?,?,?
                    )
                `;
    const values = [
        data.id,
        data.email,
        data.phone,
        data.username,
        data.pwd,
        data.address
    ]
    
    const [result] = await db.execute(sql,values);
    // console.log('데이터회원가입',result.affectedRows);
    

    return {'result' : result.affectedRows};
}