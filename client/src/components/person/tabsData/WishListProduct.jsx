export default function WishListProduct() {
    // 프로덕트 데이터 받아오면 이거 지우고 받아온데이터로 맵돌리기
    const data = [
        { 
            image: 'https://img.ssfshop.com/cmd/LB_220x293/src/https://img.ssfshop.com/goods/8SBR/25/01/22/GM0025012245916_0_THNAIL_ORGINL_20250207125752164.jpg',
            brand :'아디다스',
            title:'스웻 셔츠 - 블루',
            price:'99,000',
            saleper:'53%',
            saleprice:'39,000'
        },
        { 
            image: 'https://img.ssfshop.com/cmd/LB_220x293/src/https://img.ssfshop.com/goods/8SBR/25/01/22/GM0025012245916_0_THNAIL_ORGINL_20250207125752164.jpg',
            brand :'아디다스',
            title:'스웻 셔츠 - 블루',
            price:'99,000',
            saleper:'53%',
            saleprice:'39,000'
        },
        { 
            image: 'https://img.ssfshop.com/cmd/LB_220x293/src/https://img.ssfshop.com/goods/8SBR/25/01/22/GM0025012245916_0_THNAIL_ORGINL_20250207125752164.jpg',
            brand :'아디다스',
            title:'스웻 셔츠 - 블루',
            price:'99,000',
            saleper:'53%',
            saleprice:'39,000'
        },
        { 
            image: 'https://img.ssfshop.com/cmd/LB_220x293/src/https://img.ssfshop.com/goods/8SBR/25/01/22/GM0025012245916_0_THNAIL_ORGINL_20250207125752164.jpg',
            brand :'아디다스',
            title:'스웻 셔츠 - 블루',
            price:'99,000',
            saleper:'53%',
            saleprice:'39,000'
        },
        { 
            image: 'https://img.ssfshop.com/cmd/LB_220x293/src/https://img.ssfshop.com/goods/8SBR/25/01/22/GM0025012245916_0_THNAIL_ORGINL_20250207125752164.jpg',
            brand :'아디다스',
            title:'스웻 셔츠 - 블루',
            price:'99,000',
            saleper:'53%',
            saleprice:'39,000'
        }
    ];


    return (
        <div className="mypage-wishList-products">
            {data.map((i,index)=>
                <div>
                    <img src={i.image} alt="" />
                    <h5>{i.brand}</h5>
                    <p>{i.title}</p>
                    <h4>{i.price}</h4>
                    <span>{i.saleper}</span>
                    <span>{i.saleprice}</span>
                </div>
            )}
        </div>
    );
}