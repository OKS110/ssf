import React, { useState } from 'react';
import PersonUIform from './PersonUIform.jsx';
import {Link} from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";
import ProductMypage from '../../commons/ProductMypage.jsx';
import { LuPencilLine } from "react-icons/lu";
import { RiCameraAiLine } from "react-icons/ri";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { GoThumbsup } from "react-icons/go";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export default function ProductReview() {
    const tabsData = [
        { id: "mypageReviewEdit", label: "리뷰 작성하기", href: "#mypageReviewEdit" },
        { id: "mypageReviewCheck", label: "작성한 리뷰", href: "#mypageReviewCheck"},
    ];
   const [open,setOpen] = useState(true);
   const handleDesc = (name) => {
    setOpen(name);
}
    return (
        <div className="mypage-box">
        <div className="mypage-top-menu">
            <span>Home</span>
            <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person' className='mypage-link' >마이페이지</Link></span>
        </div>
        <div className="mypage-top-box-flex">
            <div className="mypage-top-box-empty"></div>
            <div  className="mypage-top-box   mypage-Title-notborder" >상품리뷰</div>
        </div>
        <div className="mypage-bottom-box">
                <PersonUIform />
            <article className="mypage-bottom-right">
               <ProductMypage tabs={tabsData}/>

               <div className='mypage-review-box'>
                <div>
                    <h4>상품리뷰 작성하고 최대 4500C 받으세요!</h4>
                    <h5>할인, 쿠폰 적용 후 실결제 금액이 5,000원 이상인 상품에 한해 지급됩니다.</h5>
                </div>
                <div>
                    <ul>
                        <li>
                            <span><LuPencilLine /></span>
                            <div>
                                <h4>일반리뷰</h4>
                                <h5>500C</h5>
                            </div>
                        </li>
                        <li>
                            <span><RiCameraAiLine /></span>
                            <div>
                                <h4>포토리뷰</h4>
                                <h5>1,000C</h5>
                            </div>
                        </li>
                        <li>
                            <span><HiOutlineChatBubbleLeftRight /></span>
                            <div>
                                <h4>베스트리뷰</h4>
                                <h5>3,000C</h5>
                            </div>
                        </li>
                        <li>
                            <span><GoThumbsup /></span>
                            <div>
                                <h4>도움된리뷰</h4>
                                <h5>500C</h5>
                            </div>
                        </li>
                    </ul>
                </div>
               </div>
               <div  className='mypage-review-table'>
                <table>
                        <tr className='mypage-review-table-head'>
                            <th>주문상품정보</th>
                            <th>주문일</th>
                            <th>작성기한</th>
                            <th>최대 적립 포인트</th>
                            <th>리뷰 작성</th>
                        </tr>
                        <tr className='mypage-review-table-body'>
                            <td>
                                <img style={{width:'100px'}} src="https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/08/23/GR3A24082343434_0_THNAIL_ORGINL_20240823135206364.jpg" alt="" />
                                <span>Adidas</span>
                                <span>엄청 따뜻한 후드티</span>
                            </td>
                            <td>2020.01.01</td>
                            <td>배송완료 후 2주 이내</td>
                            <td>1,000C</td>
                            <td className='mypage-review-register'>리뷰 작성하기</td>
                        </tr>
                </table>
               </div>
                <div className='mypage-review-desc'>
                    <div className='mypage-review-desc-tab'>
                        <span>상품리뷰 안내</span>
                        {open !== true ? <span onClick={()=>{handleDesc(true)}}> <SlArrowDown /> </span> :
                                    <span onClick={()=>{handleDesc(false)}}> <SlArrowUp /></span>}  
                    </div>
                    {open &&
                        <div>

                        </div>
                    }
                </div>
            </article>
        </div>
    </div>
    );
}

