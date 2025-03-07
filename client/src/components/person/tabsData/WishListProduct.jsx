// import { useContext, useEffect, useState } from "react";
// import { useProduct } from "../../../hooks/useProduct.js";
// import { ProductContext } from "../../../context/ProductContext.js";
// import { MypageContext } from "../../../context/MypageContext.js";
// import { IoMdHeart } from "react-icons/io";
// import { IoMdHeartEmpty } from "react-icons/io";
// import axios from "axios";
// import { useMypage } from "../../../hooks/useMypage.js";


export default function WishListProduct() {
    // const { getPidItem2 } = useProduct();
    // const {getCid, favoriteAllData} = useMypage();
    // const { notMypage, cid ,allLike} = useContext(MypageContext);
    // const { pidItem2, category, subCategory, setSubCategory } = useContext(ProductContext);
    // const [heactClick, setHeartClick] = useState(true);

    // useEffect(() => {
    //     const fetchCustoerList = async () => {
    //         await getCid();
    //     }
    //     fetchCustoerList();
    // }, [])
    // // console.log('cid=================',cid);   // 잘가져옴
    // useEffect(() => {
    //     const fetchCustoerList = async () => {
    //         await favoriteAllData();
    //     }
    //     fetchCustoerList();
    // }, [cid])
    // // console.log('cid=================',allLike);   // 잘가져옴

    // let pLists = '';
    // useEffect(()=>{
    //      pLists = allLike.map((item)=>item.product_id);  
    //     // console.log('==================',pLists); // 잘가져옴 
    //     // pLists = [1006, 1001,1 1002]
    //     //할거 :  pLists 에잇는값을 1개씩 꺼내서 db 에 해당 id랑 product_id 랑 보내서 pLists 값이 있으면 삭제하기
    //     // 우선 해당하트클릭하면 걔의 product_id 를 찾아와야함
    // },[allLike]) ;
    
    // const handleDeleteLike = () => {
    //         // axios.post('http://localhost:9000/mypage/deleteLike', { cid, pid })
    //         //     .then(setHeartClick(false))
    //         //     .catch(err => console.log(err));           
    // }


    // const heartItems = JSON.parse(localStorage.getItem('heart') || []); // => 얘가 문자열을 반환해서 문자열은 map 사용못함 그래서 바꿔줘야해
    // const index = heartItems.length;
    // useEffect(() => {
    //     heartItems.forEach((item) => {
    //         getPidItem2(item);
    //     });
    // }, []);


    const tabList = [
        { tabName: "코트" },
        { tabName: "스웨터" },
        { tabName: "티셔츠" },
        { tabName: "블라우스" },
        { tabName: "셔츠" },
        { tabName: "니트" },
        { tabName: "청바지" },
        { tabName: "슬랙스" },
    ];



    //className="mypage-wishList-products grid  얘 클래스명 grid 로 해놨는데 바꾸고 나서 css 가서 그리드로 바꿔야할듯 마이페이지에서도쓰고 위시리스트에서도 쓰니까 5개까지한줄에나오게하고
    /// 마이페이지에서 넘치는부분은 오버플로우히든으로하고 위시리스트에서는 전체 다 나오게 

    return (
        <>
            {/* {notMypage &&
                <>
                    <div>
                        <div className="mypage-wishList-products-category ">
                            <ul className='sub-category-select'>
                                {tabList && tabList.map((list) =>
                                    <li className={list.tabName === subCategory ? 'sub-category-select-click-tabMenu' : 'sub-category-select-tabMenu'}
                                        onClick={() => setSubCategory(list.tabName)}>
                                        {list.tabName}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="mypage-wishList-products grid">
                        {pidItem2.map((pidItem, i) =>
                            i < index &&
                            (<div className="mypage-wishList-products-box">
                                <img src={pidItem.img} alt='상품이미지' />
                                    <span className="mypage-wishList-products-heart"
                                        onClick={handleDeleteLike}>
                                        <IoMdHeart />
                                    </span> 
                                <h5>{pidItem.brand}</h5>
                                <p>{pidItem.title}</p>
                                <h4>{pidItem.costprice}</h4>
                                <span>{pidItem.discount}%</span>
                                <span>{pidItem.saleprice}</span>
                            </div>)
                        )}
                    </div>
                </>
            }
            {!notMypage &&
                <div className="mypage-wishList-products">
                    {pidItem2.map((pidItem, i) =>
                        i < index && index < 5 &&
                        (<div className="mypage-wishList-products-box">
                            <img src={pidItem.img} alt='상품이미지' />
                            <h5>{pidItem.brand}</h5>
                            <p>{pidItem.title}</p>
                            <h4>{pidItem.costprice}</h4>
                            <span>{pidItem.discount}%</span>
                            <span>{pidItem.saleprice}</span>
                        </div>)
                    )}
                </div>
            } */}
        </>
    );
}