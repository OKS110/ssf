import { db } from "./db.js";

export const getMyinfo = async({id}) => { // 이거 안씀 겟 커스터머 사용중임
    // const sql =`  이게 원래 코드인데 지금은 주문 들어간게 없어서 임시로 sql1 만든거임 나중에 바꿔
    //     select c.customer_id, 
    //             c.username, 
    //             c.email, 
    //             c.phone, 
    //             c.name, 
    //             c.password, 
    //             c.address,
    //             p.pid,
    //             p.name,
    //             p.image,
    //             p.likes,
    //             p.star,
    //             p.original_price,
    //             p.discount_rate,
    //             p.discounted_price,
    //             p.delivery_fee,
    //             p.brand,
    //             o.oid,
    //             o.order_number,
    //             o.total_price,
    //             o.status,
    //             o.order_date
    //     from customers c, favorites f, orders  o , reviews  r, products p
    //     where c.customer_id  = f.customer_id 
    //             and c.customer_id = o.customer_id
    //             and c.customer_id = r.customer_id 
    //             and p.pid = f.product_id
    //             and username =?
    //             `;
    // console.log('ddd',id);
    
    const sql1=`
                select customer_id,
                    name, email, phone,password,address, username
                     from customers 
                     where username=?
                `;

    const [result] = await db.execute(sql1,[id]);
    // console.log('haon',result[0]);
    
    return result[0];
}
// =======================================================

export const updateMyinfo = async({id,colName,value}) => {   
    
    if(colName === 'phone'){
        const ph = value.substring(0,3)
                    .concat('-',value.substring(3,7),'-',value.substring(7,11));
        const sql = `update customers set ${colName} = ? where username = ? `; 
        console.log(sql);  
        const [result] = await db.execute(sql,[ph,id]);
        return {'result':result.affectedRows};}
    else {
        const sql =`update customers set ${colName} = ? where username = ? `;                    
        // const values1 = updateData;
        console.log(sql);  
        const [result] = await db.execute(sql,[value,id]);
        return {'result':result.affectedRows};

    }
}
export const updateMyinfo2 = async({id,colName,value,colName2,value2}) => {   
     if(colName2 === 'emailDomain'){
        const em =  value.concat('@',value2) ;
        const sql = `update customers set ${colName} = ? where username = ? `; 
        console.log(sql);  
        const [result] = await db.execute(sql,[em,id]);
        return {'result':result.affectedRows};
    }   
    else if(colName2 === 'extra'){
        const zipcode = value.substring(0,5);
        const address = value.replace(zipcode, '');  
        const sql =`update customers set zipcode = ?, address = ?, additional_address = ? where username = ? `
        console.log(sql);  
        const [result] = await db.execute(sql,[zipcode,address,value2,id]);
        return {'result':result.affectedRows};
    }
}


export const updateDelivery = async({deliForm,id}) => {
    const sql1=`
               update customers set zipcode = ?, address = ?, additional_address = ? where username = ?
                `;

    const [result] = await db.execute(sql1,[deliForm.zoneCode, deliForm.address,deliForm.extraAddress, id]);
    console.log(['lolololol',result]);
    
    return {'result':result.affectedRows};
}