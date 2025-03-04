import React from 'react';
import { useState } from 'react';

export default function ReviewCheck() {
    const [select, setSelect] = useState('3month');
    const click = (name) => {
        setSelect(name);
    }
    console.log(select);
    


    return (
        <div className='mypage-review-check-box'>
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
            <div>
            작성한 상품리뷰가 없습니다.
            </div>
        </div>
    );
}

