import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";
import PersonUIform from './PersonUIform.jsx';
import ProductMypage from '../../commons/ProductMypage.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import MypageCancle from './orderCancle/tabsData/MypageCancle.jsx';
import MypageOrder from './orderCancle/tabsData/MypageOrder.jsx';
import MypageReturn from './orderCancle/tabsData/MypageReturn.jsx';
import MypageChange from './orderCancle/tabsData/MypageChange.jsx';

export default function OrderCancle() {
    const tabsData = [
        { id: "mypageOCRCorder", label: "주문", href: "#mypageOCRCorder", content:<MypageOrder/> },
        { id: "mypageOCRCchange", label: "교환", href: "#mypageOCRCchange", content:< MypageChange/>},
        { id: "mypageOCRCreturn", label: "반품", href: "#mypageOCRCreturn" , content:<MypageReturn/>},
        { id: "mypageOCRCcancle", label: "취소", href: "#mypageOCRCcancle" , content:<MypageCancle />}
    ];
    
    // 부모에서 활성화된 탭 상태를 관리
    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

    // 현재 활성화된 탭의 콘텐츠 찾기
    const renderContent = () => {
        const activeContent = tabsData.find(tab => tab.id === activeTab);
        return activeContent ? activeContent.content : null;
    };


    const [select, setSelect] = useState('3month');

    const click = (name) => {
        setSelect(name);
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
                         <ProductMypage 
                            tabs={tabsData} 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                        />
                        <div style={{ border: "1px solid red" }}>
                            {renderContent()}
                        </div>                                           

                    </div>
                </div>                
            </article>
        </div>
    </div>
    );
}

