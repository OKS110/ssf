import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";
import PersonUIform from './PersonUIform.jsx';
import ProductMypage from '../../commons/ProductMypage.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export default function OrderCancle() {
    const tabsData = [
        { id: "mypageOCRCorder", label: "주문", href: "#mypageOCRCorder" },
        { id: "mypageOCRCchange", label: "교환", href: "#mypageOCRCchange"},
        { id: "mypageOCRCreturn", label: "반품", href: "#mypageOCRCreturn" },
        { id: "mypageOCRCcancle", label: "취소", href: "#mypageOCRCcancle" }
    ];

    const [select, setSelect] = useState('3month');
    const [open,setOpen] = useState(true);

    const click = (name) => {
        setSelect(name);
    }
    
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
            <div  className="mypage-top-box   mypage-Title"  >주문/교환/반품/취소 내역</div>
        </div>
        <div className="mypage-bottom-box">
                <PersonUIform />
            <article className="mypage-bottom-right">
                <div className='order-list-date'>
                    <div className='order-date'>
                        <ul>
                            <li onClick={()=> {click('3month')}}
                                className={select === '3month' ? 'order-date-active' : 'order-date-none'} >3개월</li>
                            <li  onClick={()=>{click('6month')}}
                                className={select === '6month' ? 'order-date-active' : 'order-date-none'} >6개월</li>
                            <li onClick={()=>{click('12month')}}
                                className={select === '12month' ? 'order-date-active' : 'order-date-none'}>12개월</li>
                            <li  onClick={()=>{click('month')}}
                                className={select === 'month' ? 'order-date-active' : 'order-date-none'}>날짜지정</li>
                        </ul>
                    </div>
                    <div className='order-list'>
                        <ProductMypage tabs={tabsData}/>
                        <div>
                            내역이 없습니다
                        </div>
                    </div>
                </div>
                <div className='order-list-ordertab'>
                    <div className='order-list-bottom'>
                        <span>주문 진행 단계 안내</span>
                        {open !== true ? <span onClick={()=>{handleDesc(true)}}> <SlArrowDown /> </span> :
                         <span onClick={()=>{handleDesc(false)}}> <SlArrowUp /></span>}                        
                    </div>
                    {open &&
                        <div className='order-list-delivery'>
                            <div className='order-list-deliverydots'></div>
                            <div className='order-list-deliverymap'>
                                <div>
                                    <p>1</p>
                                    <p>입금 대기중</p>
                                    <ul>
                                        <li>결제수단변경</li>
                                        <li>주문취소</li>
                                        <li>배송지 변경</li>
                                    </ul>
                                </div>
                                <div>
                                    <p>2</p>
                                    <p>결제 완료</p>
                                    <ul>
                                        <li>주문취소</li>
                                        <li>배송지변경</li>
                                    </ul>
                                </div>
                                <div>
                                    <p>3</p>
                                    <p>상품 준비중</p>
                                </div>
                                <div>
                                    <p>4</p>
                                    <p>배송중</p>
                                    <ul>
                                        <li>배송조회</li>
                                    </ul>
                                </div>
                                <div>
                                    <p>5</p>
                                    <p>배송완료</p>
                                    <ul>
                                        <li>교환/반품 신청(배송완료 후 7일내)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='order-list-deliverylist'>
                                <ul>
                                    <li>
                                        <span>1</span>
                                        <span>입금 대기중</span>
                                        <span>입금 기한까지 입금이 완료되지 않으면 주문이 취소됩니다.</span>
                                    </li>
                                    <li>
                                        <span>2</span>
                                        <span>결제 완료</span>
                                        <span>입금 확인 및 결제가 완료되어 주문이 접수됩니다.</span>
                                    </li>
                                    <li>
                                        <span>3</span>
                                        <span>상품 준비중</span>
                                        <span>배송을 위한 상품을 준비 중입니다.</span>
                                    </li>
                                    <li>
                                        <span>4</span>
                                        <span>배송중</span>
                                        <span>준비된 상품이 배송됩니다.</span>                                        
                                    </li>
                                    <li>
                                        <span>5</span>
                                        <span>배송완료</span>
                                        <span>주문한 상품이 배송되어 완료됩니다.</span>                                        
                                    </li>
                                </ul>
                            </div>
                        </div>                  
                    }
                </div>
            </article>
        </div>
    </div>
    );
}

