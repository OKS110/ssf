import React from 'react';
import {Link} from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";
import PersonUIform from "./PersonUIform.jsx";


export default function OrderCancle() {

    // customer_name, order_list, 등

    return (
<div className="mypage-box">
        <div className="mypage-top-menu">
            <span>Home</span>
            <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person' className='mypage-link' >마이페이지</Link></span>
        </div>
        <div className="mypage-top-box-flex">
            <div className="mypage-top-box-empty"></div>
            <div  className="mypage-top-box   mypage-Title"  >주문/교환/반품/취소 내역</div>
        </div>
        <div className="mypage-bottom-box">
                <PersonUIform />
            <article className="mypage-bottom-right">
                <div className='order-list-date'>
                    <div className='order-date'>
                        <ul>
                            <li>3개월</li>
                            <li>6개월</li>
                            <li>12개월</li>
                            <li>날짜지정</li>
                        </ul>
                    </div>
                    <div className='order-list'>
                        <ul>
                            <li className='order-list-active'>주문</li>
                            <li>교환</li>
                            <li>반품</li>
                            <li>취소</li>
                        </ul>
                        <div>
                            내역이 없습니다
                        </div>
                    </div>
                </div>
                <div className='order-list-ordertab'>
                    <div>
                        <span>주문 진행 단계 안내</span>
                        <span> 화살표 </span>
                    </div>
                </div>
            </article>
        </div>
    </div>
    );
}

