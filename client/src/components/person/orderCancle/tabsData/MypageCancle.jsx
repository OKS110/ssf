import React from 'react';

export default function MypageCancle() {
    return (
        <div className='order-list-ordertab'>
            <div>
                <div className='mypage-review-table-notmargin'>
                    <table>
                        <tr className='mypage-review-table-head'>
                            <th>주문 취소 상품정보</th>
                            <th>주문번호</th>
                            <th>주문일</th>
                            <th>취소일</th>
                            <th>주문 취소 진행 상태</th>
                        </tr>
                        <tr className='mypage-review-table-body'>
                            <td>
                                <img style={{ width: '100px' }} src="https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/08/23/GR3A24082343434_0_THNAIL_ORGINL_20240823135206364.jpg" alt="" />
                                <span>Adidas</span>
                                <span>엄청 따뜻한 후드티</span>
                            </td>
                            <td>s102931240sdfsd0</td>
                            <td>2020.01.01</td>
                            <td>2020.01.15</td>
                            <td>주문 취소 완료</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

