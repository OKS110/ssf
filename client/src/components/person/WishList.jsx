import React, { useEffect } from 'react';
import WishListBrand from './tabsData/WishListBrand.jsx';
import WishListProduct from './tabsData/WishListProduct.jsx';
import WishListContent from './tabsData/WishListContent.jsx';
import { SlArrowRight } from "react-icons/sl";
import { useState } from 'react';
import { Link } from "react-router-dom";
import PersonUIform from './PersonUIform.jsx';
import ProductMypage from '../../commons/ProductMypage.jsx';
import { ProductContext } from '../../context/ProductContext.js';
import { useContext } from 'react';
import { useProduct } from '../../hooks/useProduct.js';

export default function WishList() {
    const tabsData = [
        { id: "mypageWishListProduct", label: "상품", href: "#mypageWishListProduct", content: <WishListProduct /> },
        { id: "mypageWishListBrand", label: "브랜드", href: "#mypageWishListBrand", content: <WishListBrand /> },
        { id: "mypageWishListContent", label: "콘텐츠", href: "#mypageWishListContent", content: <WishListContent /> }
    ];
    // 부모에서 활성화된 탭 상태를 관리
    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");
    // 현재 활성화된 탭의 콘텐츠 찾기
    const renderContent = () => {
        const activeContent = tabsData.find(tab => tab.id === activeTab);
        return activeContent ? activeContent.content : null;
    };
    return (
        <div className="mypage-box">
            <div className="mypage-top-menu">
                <span>Home</span>
                <SlArrowRight className="mypage-top-menu-icon" />
                <span ><Link to='/person' className='mypage-link' >마이페이지</Link></span>
            </div>
            <div className="mypage-top-box-flex">
                <div className="mypage-top-box-empty"></div>
                <div className="mypage-top-box "  >위시리스트</div>
            </div>
            <div className="mypage-bottom-box">
                <PersonUIform />
                <article className="mypage-bottom-right">
                    <ProductMypage
                        tabs={tabsData}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab} />
                    <div>
                        {renderContent()}
                    </div>
                  
                </article>
            </div>
        </div>
    );
}

