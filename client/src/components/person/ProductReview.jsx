import React, { useState } from 'react';
import PersonUIform from './PersonUIform.jsx';
import {Link} from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";
import ProductMypage from '../../commons/ProductMypage.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import ReviewResite from './Review/ReviewResite.jsx';
import ReviewCheck from './Review/ReviewCheck.jsx';

export default function ProductReview() {
    const tabsData = [
        { id: "mypageReviewEdit", label: "리뷰 작성하기", href: "#mypageReviewEdit" , content:<ReviewResite />},
        { id: "mypageReviewCheck", label: "작성한 리뷰", href: "#mypageReviewCheck", content:<ReviewCheck /> },
         
    ];
    
    // 부모에서 활성화된 탭 상태를 관리
    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

    // 현재 활성화된 탭의 콘텐츠 찾기
    const renderContent = () => {
        const activeContent = tabsData.find(tab => tab.id === activeTab);
        return activeContent ? activeContent.content : null;
    };

   const [open,setOpen] = useState(true);
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
            <div  className="mypage-top-box   mypage-Title-notborder" >상품리뷰</div>
        </div>
        <div className="mypage-bottom-box">
                <PersonUIform />
            <article className="mypage-bottom-right">
               <ProductMypage 
                    tabs={tabsData} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                />
                <div style={{ border: "1px solid red" }}>
                    {renderContent()}
                </div>                               
            </article>
        </div>
    </div>
    );
}

