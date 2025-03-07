import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { MypageContext } from '../../context/MypageContext';
// 마이페이지 왼쪽 탭중 만들고있는 컴포넌트는 빨간색표시함

export default function PersonUIform() {
    const {notMypage, setNotMypage} = useContext(MypageContext);
  useEffect(()=>{
            setNotMypage(true);
    },[notMypage])

    return (
                <nav className="mypage-bottom-left">
                    <h3>주문관리</h3>
                    <ul>
                        <li><Link to='/person/orderChangeReturnCancle' style={{color:'red'}}>주문/교환/반품/취소 내역</Link></li>
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
                        <li><Link to='/Person/productReview' style={{color:'red'}}>상품리뷰</Link></li>
                        <li><a href="">상품Q&A</a></li>
                        <li><a href="">최근 본 상품</a></li>
                        <li onClick={()=>{setNotMypage(true)}}><Link to='/person/wishList' style={{color:'red'}}>위시리스트</Link></li>
                        <li><a href="">재입고 알림</a></li>
                        <li><a href="">이벤트 참여내역</a></li>
                    </ul>
                    <h3>나의 정보</h3>
                    <ul>
                        <li><Link to='/person/editMemberInfo'style={{color:'red'}}>회원정보 관리</Link></li>
                        <li><a href="">마케팅정보 수신 동의</a></li>
                        <li><Link to='/person/editMemberInfo/delivery' >배송지 관리</Link></li>
                    </ul>
                    <h3>고객센터</h3>
                    <ul>
                        <li><a href="">1:1문의</a></li>
                        <li><a href="">무료 사이즈 수선</a></li>
                        <li><a href="">A/S 수선</a></li>
                    </ul>
                </nav>
    );
}