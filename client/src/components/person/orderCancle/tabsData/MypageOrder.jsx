import React, { useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export default function MypageOrder() {
        const [open,setOpen] = useState(true);    
        
        const handleDesc = (name) => {
            setOpen(name);
        }

    return (
         <div className='order-list-ordertab'>
            <div>
                <div className='mypage-review-table-notmargin'>
                    <table>
                            <tr className='mypage-review-table-head'>
                                <th>주문상품정보</th>
                                <th>주문번호</th>
                                <th>주문일</th>
                                <th>최대 적립 포인트</th>
                                <th>주문진행 상태</th>
                            </tr>
                            <tr className='mypage-review-table-body mypage-ocrc-table-body'>
                                <td>
                                    <img style={{width:'100px'}} src="https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/08/23/GR3A24082343434_0_THNAIL_ORGINL_20240823135206364.jpg" alt="" />
                                    <span>Adidas</span>
                                    <span>엄청 따뜻한 후드티</span>
                                </td>
                                <td>s102931240sdfsd0</td>
                                <td>2020.01.01</td>
                                <td>1,000C</td>
                                <td>배송완료</td>
                            </tr>
                    </table>
                    <div>
                        <button>교환</button>
                        <button>반품</button>
                    </div>
                </div>
            </div>
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
    );
}

