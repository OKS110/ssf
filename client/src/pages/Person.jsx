import { MdKeyboardArrowRight } from "react-icons/md";
import { LuMessageSquareMore } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { BiParty } from "react-icons/bi";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineCardMembership } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PersonUIform from "../components/person/PersonUIform.jsx";
import ProductMypage from "../commons/ProductMypage.jsx";
import WishListProduct from "../components/person/tabsData/WishListProduct.jsx";
import WishListBrand from "../components/person/tabsData/WishListBrand.jsx";
import WishListContent from "../components/person/tabsData/WishListContent.jsx";
// import axios from 'axios';
// import { MypageContext } from "../context/MypageContext.js";
// import {useContext} from 'react';   
// import { CustomersContext } from '../../../context/CustomersContext.js';
// import { useCustomers } from '../../../hooks/useCustomers.js';

export default function Person(){
    // const {customersList} = useContext(CustomersContext);
    // const { getCustomersList } = useCustomers();
    // useEffect( async () => {
    //     await getCustomersList();
    // }, [])
    
    // console.log('customersLisㅇㅇㅇㅇt',customersList); // 음..
    

    // const [data, setData ] = useState([]);  그냥 이렇게만 하면 아주 잘 데이터 가져옴
    // useEffect(()=>{
    //     const id = localStorage.getItem('user_id');
    //     axios.post('http://localhost:9000/mypage/myinfo',{'id':id})
    //         .then(res => 
    //         setData(res.data)
    //         )
    //         .catch(error => console.log(error)
    //         );
    // },[]);
    // console.log(data); 
    



    const tabsData = [
        { id: "mypageWishListProduct", label: "상품", href: "#mypageWishListProduct", content:<WishListProduct/> },
        { id: "mypageWishListBrand", label: "브랜드", href: "#mypageWishListBrand", content:<WishListBrand/>},
        { id: "mypageWishListContent", label: "콘텐츠", href: "#mypageWishListContent" ,content:<WishListContent/>}
    ];
    // productMypage , DetailProducts 참고해서 버튼클릭햇을시 해당하는거로 넘어가게 해


    // 부모에서 활성화된 탭 상태를 관리
    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

    // 현재 활성화된 탭의 콘텐츠 찾기
    const renderContent = () => {
        const activeContent = tabsData.find(tab => tab.id === activeTab);
        return activeContent ? activeContent.content : null;
    };
 


    return (
        <div className="mypage-box">
            <div className="mypage-top-menu">
                <span>Home</span>
                <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person' className='mypage-link' >마이페이지</Link></span>
            </div>
            <div className="mypage-top-box-flex">
                <div className="mypage-top-box-empty"></div>
                <div  className="mypage-top-box">마이페이지</div>
            </div>
            <div className="mypage-bottom-box">
               <PersonUIform />
                <article className="mypage-bottom-right">
                    <div className="mypage-bottom-my">
                        <div className="mypage-bottom-my-top">   
                            <div className="mypage-bottom-my-top-left">
                                <span><MdOutlineCardMembership /></span>
                                {/* <span>{customerInfo.name}님</span> */}
                                <span><SlArrowRight /></span>
                            </div>
                            <div className="mypage-bottom-my-top-right">
                                <span>포인트 사용방법</span>
                                <span><SlArrowRight /></span>
                            </div>
                        </div>
                        <div className="mypage-bottom-my-bottom">
                            <ul>
                                <a href="">
                                    <li>
                                        <span>쿠폰</span>
                                        <h3>5장</h3>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span>멤버십 포인트</span>
                                        <h3>0P</h3>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span>퍼플코인</span>
                                        <h3>0C</h3>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span>기프트 포인트</span>
                                        <h3>0G</h3>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                    <div className="mypage-order-product">
                        <div className="mypage-order-product-top">
                            <h2>최근 주문 상품</h2>
                            <div>
                                <span>더보기</span>
                                <span><MdKeyboardArrowRight /></span>
                            </div>
                        </div>
                        <div className="mypage-order-product-bottom">
                            <span>최근 주문 내역이 없습니다. 마음에드는 상품을 찾아보세요.</span>
                            <div>
                                <Link to ='/'><span>쇼핑하기<MdKeyboardArrowRight /></span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="mypage-wishList" > {/* 위시리스트는 찜한게 있어야 나오게 해야한다  */}
                        <div className="mypage-wishList-top" >
                            <h2>위시리스트</h2>
                            <div>
                                <span>더보기</span>
                                <span><MdKeyboardArrowRight /></span>
                            </div>
                        </div>
                        <ProductMypage 
                            tabs={tabsData} 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                        />
                        <div style={{ border: "1px solid red" }}>
                            {renderContent()}
                        </div>

                        <div className="mypage-wishList-items">
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                        </div>
                    </div>
                    <div className="mypage-active">
                        <h2>활동내역</h2>
                        <div className="mypage-active-box">
                            <ul>
                                <a href="">
                                    <li>
                                        <span><LuMessageSquareMore /></span>
                                        <span>1:1문의</span>
                                        <span>0건</span>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span><CiEdit /></span>
                                        <span>상품Q&A</span>
                                        <span>0건</span>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span><FaRegBell /></span>
                                        <span>재입고 알림</span>
                                        <span>0건</span>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span><BiParty /></span>
                                        <span>이벤트 참여내역</span>
                                        <span>0건</span>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}