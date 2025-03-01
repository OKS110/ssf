import React, { useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export default function MypageChange() {
    const [open, setOpen] = useState(true);

    const handleDesc = (name) => {
        setOpen(name);
    }

    return (
        <div className='order-list-ordertab'>
            <div className='mypage-ocrcbox'>
                <div className='mypage-review-table-notmargin'>
                    <table>
                        <tr className='mypage-review-table-head'>
                            <th>교환상품정보</th>
                            <th>주문번호</th>
                            <th>주문일</th>
                            <th>교환진행 상태</th>
                        </tr>
                        <tr className='mypage-review-table-body mypage-ocrc-table-body'>
                            <td>
                                <img style={{ width: '100px' }} src="https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/08/23/GR3A24082343434_0_THNAIL_ORGINL_20240823135206364.jpg" alt="" />
                                <span>Adidas</span>
                                <span>엄청 따뜻한 후드티</span>
                            </td>
                            <td>s102931240sdfsd0</td>
                            <td>2020.01.01</td>
                            <td>교환완료</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='order-list-bottom'>
                <span>교환 진행 단계 안내</span>
                {open !== true ? <span onClick={() => { handleDesc(true) }}> <SlArrowDown /> </span> :
                    <span onClick={() => { handleDesc(false) }}> <SlArrowUp /></span>}
            </div>
            {open &&
                <div className='order-list-delivery'>
                    <div className='order-list-changedots'></div>
                    <div className='order-list-deliverymap-top'>
                        <div>교환 신청</div>
                        <div>교환 진행중</div>
                        <div>교환완료</div>
                    </div>
                    <div className='order-list-deliverymap'>
                        <div>
                            <p>1</p>
                            <p>교환 신청</p>
                        </div>
                        <div>
                            <p>2</p>
                            <p>교환 접수</p>
                        </div>
                        <div>
                            <p>3</p>
                            <p>상품수거예정</p>
                        </div>
                        <div>
                            <p>4</p>
                            <p>상품 회수중</p>
                        </div>
                        <div>
                            <p>5</p>
                            <p>회수상품 확인중</p>
                        </div>
                        <div>
                            <p>6</p>
                            <p>상품 배송중</p>
                        </div>
                        <div>
                            <p>7</p>
                            <p>배송완료</p>
                        </div>
                    </div>
                    <div className='order-list-deliverylist'>
                        <ul>
                            <li>
                                <span>1</span>
                                <span>교환 신청</span>                                
                                <span>배송완료 후 7일 이내 신청 가능합니다. 사유에 따라 교환배송비가 부과될 수 있습니다. 교환비 추가 결제가 필요한 경우, 결제단계까지 완료되어야 신청됩니다.</span>
                            </li>
                            <li>
                                <span>2</span>
                                <span>교환 접수</span>
                                <span>상품 불량 등의 사유는 고객센터 확인 후 접수됩니다. 상황에 따라 1~2 영업일 소요될 수 있습니다.</span>
                            </li>
                            <li>
                                <span>3</span>
                                <span>상품수거예정</span>
                                <span>2~3일 내, SSF SHOP 지정 택배 기사님이 방문하여 상품을 수거할 예정입니다. </span>                                                    
                            </li>
                            <li>
                                <span>4</span>
                                <span>상품 회수중</span>
                                <span>상품을 수거하여 반송처로 이동중 입니다.</span>
                            </li>
                            <li>
                                <span>5</span>
                                <span>
                                회수상품 확인중</span>
                                <span>회수상품 검수를 통해 교환 가능 여부를 확인합니다. 신청 사유와 상이하거나 상품에 이상이 있는 경우 교환 처리가 되지 않을 수 있습니다.</span>
                            </li>
                            <li>
                                <span>6</span>
                                <span>
                                상품 배송중</span>
                                <span>회수상품 검수 완료 후 교환 상품이 배송됩니다.</span>                                
                            </li>
                            <li>
                                <span>7</span>
                                <span>배송완료</span>
                                <span>교환 상품이 배송되어 교환이 완료됩니다.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

