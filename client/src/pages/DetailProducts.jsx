import { useState, useRef } from "react";
import useFixedScroll from "../hooks/useFixedScroll.js";

import ProductMypage from "../commons/ProductMypage";
import DetailImage from "../components/DetailProducts/DetailImage";
import DetailOrder from "../components/DetailProducts/DetailOrder";
import DetailTop from "../components/DetailProducts/DetailTop";
import GoodsDetail from "../components/DetailProducts/tabsData/GoodsDetail";
import Recommend from "../components/DetailProducts/tabsData/Recommend";
import Review from "../components/DetailProducts/tabsData/Review";
import Size from "../components/DetailProducts/tabsData/Size";

export default function DetailProducts() {
    const tabsData = [
        { id: "goodsDetailTab", label: "상품정보", href: "#goodsDetailTabs", content: <GoodsDetail /> },
        { id: "sizeTab", label: "사이즈&핏", href: "#goodsDetailTabs", content: <Size /> },
        { id: "reviewTab", label: "리뷰", href: "#goodsDetailTabs", content: <Review /> },
        { id: "recommendTab", label: "추천", href: "#goodsDetailTabs", content: <Recommend /> }
    ];

    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");
    const contentRef = useRef(null); // 콘텐츠 위치 추적 Ref
    const { ref: tabRef, isFixed } = useFixedScroll(); // 커스텀 훅 사용하여 스크롤 고정 관리
        //ref를 tabRef로 별칭 사용

    // 탭 클릭 시 해당 콘텐츠로 스크롤 이동
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // 현재 활성화된 탭의 콘텐츠 찾기
    const renderContent = () => {
        const activeContent = tabsData.find(tab => tab.id === activeTab);
        return activeContent ? activeContent.content : null;
    };

    return (
        <div className="detail-wrap content-wrap" style={{ position: "relative" }}>
            <DetailTop />
            <div className="gods-summary" view-section="summary">
                <DetailImage />
                <DetailOrder />
            </div>

            {/* 탭 고정 */}
            <div
                ref={tabRef}
                className={`product-mypage-container ${isFixed ? "fixed" : ""}`}
                style={{
                    position: isFixed ? "fixed" : "relative", //useFiexdScroll에서 받아온 isFixed의 불리언 값에 따라 고정 여부 확인
                    top: isFixed ? "0" : "auto",
                    width: "100%",
                    maxWidth: "1440px",
                    zIndex: 1000,
                }}
            >
                <ProductMypage
                    tabs={tabsData}
                    activeTab={activeTab}
                    setActiveTab={handleTabClick} // 클릭 시 스크롤 이동 추가
                />
            </div>

            {/* 기존 컨텐츠 영역 활용 & 스크롤 이동 */}
            <div ref={contentRef} style={{ border: "1px solid red" }}>
                {renderContent()}
            </div>
        </div>
    );
}
