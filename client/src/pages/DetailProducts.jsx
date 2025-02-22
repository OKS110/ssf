import { useState } from "react";
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

    // 부모에서 활성화된 탭 상태를 관리
    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

    // 현재 활성화된 탭의 콘텐츠 찾기
    const renderContent = () => {
        const activeContent = tabsData.find(tab => tab.id === activeTab);
        return activeContent ? activeContent.content : null;
    };

    return (
        <div className="detail-wrap content-wrap">
            <DetailTop />
            <div className="gods-summary" view-section="summary">
                <DetailImage />
                <DetailOrder />
            </div>

            {/* 탭 컴포넌트에 상태 전달 */}
            <ProductMypage 
                tabs={tabsData} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />

            {/* 부모에서 콘텐츠 렌더링 */}
            <div style={{ border: "1px solid red" }}>
                {renderContent()}
            </div>
        </div>
    );
}
