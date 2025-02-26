import { db } from "./db.js";

export const getMyinfo = async({id}) => {
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
                    name, email, phone,password,address
                     from customers 
                     where username=?
                `;

    const [result] = await db.execute(sql1,[id]);
    console.log('haon',result[0]);
    
    return result[0];
}