import React, { useState } from "react";
import Button from "../../commons/Button.jsx";
import OrderGrayBox from "../Carts/OrderGrayBox.jsx";
import PayOption from "../PayOption.jsx";
import OrderForm from './OrderForm.jsx';

export default function OrderContents({ 
    handleOrderSubmit, 
    selectedPayMethod, 
    setSelectedPayMethod 
}) {
    // 주문서 입력 데이터
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        message: ""
    });

    // 입력 값 초기화 함수
    const resetForm = () => {
        setFormData({ name: "", phone: "", email: "", address: "", message: "" });
        console.log("입력값 초기화 완료");
    };

    return (
        <>
            {/* 주문서 입력 폼 */}
            <OrderForm formData={formData} setFormData={setFormData} resetForm={resetForm} />

            {/* 결제 수단 선택 */}
            <PayOption onPaymentMethodChange={setSelectedPayMethod} />
            <OrderGrayBox />

            {/* 구매 동의 체크박스 */}
            <span className="checkbox">
                <input className="dis-check" id="btnAgreePurchase" type="checkbox" />
                <label htmlFor="btnAgreePurchase"><i></i>구매동의(필수)</label>
            </span>

            {/* 결제하기 버튼 */}
            <div className="submit_order etc">
                <p>위 주문 내용을 확인하였으며 결제에 동의합니다.</p>
                <Button className="bk" title="결제하기" onClick={(e) => handleOrderSubmit(e, formData)} />
            </div>
        </>
    );
}
