import { useState } from "react";

export default function ProductMypage({ tabs = [] }) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || ""); // 에러 처리

    // 현재 활성화된 탭의 내용을 찾는 함수
    const renderContent = () => {
        const activeContent = tabs.find(tab => tab.id === activeTab);
        // console.log(activeContent);
        return activeContent ? activeContent.content : null; // 존재하면 content 반환, 없으면 null
    };

    return (
        <div className="gods-detail">
            {/* 공통 UI */}
            <div className="tab-rects" role="tablist" style={{ width: "auto", transform: "translateY(0px)", backgroundColor: "green" }}>
                <ul id="goodsDetailTabs">
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            id={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <a href={tab.href} role="button" tabIndex="0">
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 동적으로 탭 컨텐츠 렌더링 */}
            <div style={{ border: "1px solid red" }}>
                {renderContent()}
            </div>
        </div>
    );
}
