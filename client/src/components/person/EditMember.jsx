import React from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import EditMyInfo from './orderCancle/EditMyInfo';

export default function EditMember() {
    // const category = {
    //     'myinfo':myinfo
    // };
    // 이거 카테고리 눌러서 넘어가는거 쇼피에 잇자나 그거 참고행


    return (
        <div className="mypage-box">
        <div className="mypage-top-menu">
            <span>Home</span>
            <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person'className='mypage-link' >마이페이지</Link></span>
        </div>
        <div className="mypage-top-box-flex">
            <div className="mypage-top-box-empty"></div>
            <div  className="mypage-top-box  mypage-Title">회원정보 관리</div>
        </div>
        <div className="mypage-bottom-box">
            <nav className="mypage-bottom-left">
                <h3>주문관리</h3>
                <ul>
                <li><Link to='/person/orderChangeReturnCancle'>주문/교환/반품/취소 내역</Link></li>
                <li><a href="">매장 구매내역</a></li>
                </ul>
                <h3>나의 혜택</h3>
                <ul>
                    <li><a href="">쿠폰</a></li>
                    <li><a href="">멤버십 포인트</a></li>
                    <li><a href="">퍼플코인</a></li>
                    <li><a href="">기프트 포인트</a></li>
                </ul>
                <h3>나의 활동</h3>
                <ul>
                    <li><a href="">상품리뷰</a></li>
                    <li><a href="">상품Q&A</a></li>
                    <li><a href="">최근 본 상품</a></li>
                    <li><a href="">위시리스트</a></li>
                    <li><a href="">재입고 알림</a></li>
                    <li><a href="">이벤트 참여내역</a></li>
                </ul>
                <h3>나의 정보</h3>
                <ul>
                    <li><Link to='/person/editMemberInfo'>회원정보 관리</Link></li>
                    <li><a href="">마케팅정보 수신 동의</a></li>
                    <li><a href="">배송지 관리</a></li>
                </ul>
                <h3>고객센터</h3>
                <ul>
                    <li><a href="">1:1문의</a></li>
                    <li><a href="">무료 사이즈 수선</a></li>
                    <li><a href="">A/S 수선</a></li>
                </ul>
            </nav>
            <article className="mypage-bottom-right">
                <div className='mypage-user-info'>
                    <ul>
                        <li>내정보 관리</li>
                        <li className='mypage-user-info-tab' >
                            <span>회원정보 수정</span><span><SlArrowRight /></span>
                            </li>
                        <li className='mypage-user-info-tab'>
                            <span>사이즈 관리</span><span><SlArrowRight /></span>
                            </li>
                        <li className='mypage-user-info-tab'>
                            <span>환불계좌 관리</span><span><SlArrowRight /></span>
                            </li>
                        <li className='mypage-user-info-tab'>
                            <span>마케팅정보 수신 동의</span><span><SlArrowRight /></span>
                            </li>
                        <li className='mypage-user-info-tab'>
                            <span>배송지 관리</span><span><SlArrowRight /></span>
                            </li>
                    </ul>
                </div>                
            {/* 해당하는탭클릭하면 그 컴포넌트로이동하게 만들어 온클릭해서  */}
                <EditMyInfo />
            </article>
        </div>
    </div>
    );
}

