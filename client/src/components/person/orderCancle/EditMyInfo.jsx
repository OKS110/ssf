import React from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function EditMyInfo() {
    return (
        <div className="mypage-box">
        <div className="mypage-top-menu">
            <span>Home</span>
            <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person'className='mypage-link' >마이페이지</Link></span>
        </div>
        <div className="mypage-top-box-flex">
            <div className="mypage-top-box-empty"></div>
            <div  className="mypage-top-box  mypage-Title">비밀번호 확인</div>
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
                    여기에 만들엉
            </article>
        </div>
    </div>
    );
}

