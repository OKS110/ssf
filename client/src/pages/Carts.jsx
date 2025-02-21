import React, {useState} from "react";
import LoginCartsNav from "../commons/LoginCartsNav";

import CartOrderBill from "../components/Carts/CartOrderBill";
import CartOrderDesc from "../components/Carts/CartOrderDesc";
import OrderGrayBox from "../components/Carts/OrderGrayBox";
import CartOrderHead from "../components/Carts/CartOrderHead";
import CartOrderMain from "../components/Carts/CartOrderMain";

export default function Carts(){
    const [activeTab, setActiveTab] = useState("tab1");
    const menuListName = [
        { "tab": "tab1", "label": "일반배송(0)" },
        { "tab": "tab2", "label": "빠른배송(0)" },
        { "tab": "tab3", "label": "매장픽업(0)" },
        { "tab": "tab4", "label": "예약주문(0)" },
    ];
    return (
        <section id="main" className="content-wrap content-wrap-padding">
            <h1>장바구니</h1>   
            <section className="carts-wrap">
                <div className="tabs carts">
                        {/* 공통 컴포넌트 사용 */}
                        <LoginCartsNav activeTab={activeTab} setActiveTab={setActiveTab}
                                 menuListName={menuListName} />
                     
        
                        
                        <div className="order_wrap on all-group">
                            <CartOrderHead></CartOrderHead>
                            {/* 장바구니에 상품이 없는 경우 Head에서 관리*/}
                            <div className="order_set" id="cartSubGroup1">
                                <CartOrderMain></CartOrderMain>
                                {/* table을 컴포넌트로 */}
                                <OrderGrayBox></OrderGrayBox>
                            </div>

                           <CartOrderBill></CartOrderBill>


                            <CartOrderDesc></CartOrderDesc>
                            
                        </div>    
                </div>


               
            </section>

        </section>
    );
}