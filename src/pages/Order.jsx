import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderContents from '../components/Order/OrderContents.jsx';
import OrderCertify from "../components/Order/OrderCertify.jsx";

export default function Order() {
    const navigate = useNavigate();

    const orderItems = [
        { id: 1, image: "https://via.placeholder.com/100", name: "상품 A", discount: "10%", shipping: "무료 배송", price: "10000" },
        { id: 2, image: "https://via.placeholder.com/100", name: "상품 B", discount: "5%", shipping: "유료 배송 (₩3,000)", price: "20000" }
    ];

    const [token, setToken] = useState(null);
    const [selectedPayMethod, setSelectedPayMethod] = useState("CREDT_CARD_PAY");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        console.log("현재 토큰 상태:", storedToken);
    }, []);

    const isAuthorized = !!token; // 토큰이 있으면 true, 없으면 false

    // 주문 제출 핸들러 (구매 동의 체크 & 로그인 상태 체크)
    const handleOrderSubmit = (e) => {
        e.preventDefault();

        console.log("결제 버튼 클릭 - 현재 토큰:", token);

        // 토큰이 없으면 로그인 페이지로 이동 / 주문 페이지 이동
        if (!isAuthorized) {
            alert("로그인 또는 휴대폰 인증을 완료해주세요.");
            // navigate("/login");
            return;
        }

        // 구매 동의 체크 여부 확인
        const agreeCheckbox = document.getElementById("btnAgreePurchase");
        if (!agreeCheckbox.checked) {
            alert("구매 동의에 체크해주세요.");
            return;
        }

        //  최종 주문 정보 출력
        console.log("상품 정보:", orderItems);
        console.log("선택된 결제 수단:", selectedPayMethod);

        alert("결제완료");
        // navigate('/');
    };

    return (
        <section id="order" className="content-wrap content-wrap-padding">
            <h1>주문/결제</h1>
            <div className="form_wrap">
                <form onSubmit={handleOrderSubmit}>
                    <table className="grid_wrap goods" style={{ backgroundColor: "yellow" }}>
                        <colgroup>
                            <col width="124" />
                            <col width="*" />
                            <col width="200" />
                            <col width="200" />
                            <col width="180" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th colSpan="2" scope="col">상품정보</th>
                                <th scope="col">할인/혜택</th>
                                <th scope="col">배송 정보</th>
                                <th scope="col">주문금액</th>
                            </tr>
                        </thead>
                        <tbody className="all-group">
                            {orderItems.map((item) => (
                                <tr key={item.id}>
                                    <td><img src={item.image} alt={item.name} width="100" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.shipping}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 토큰이 없을 때만 OrderCertify 표시 */}
                    {!isAuthorized && <OrderCertify />}

                    <OrderContents 
                        orderItems={orderItems}
                        handleOrderSubmit={handleOrderSubmit}
                        selectedPayMethod={selectedPayMethod}
                        setSelectedPayMethod={setSelectedPayMethod}
                    />
                </form>
            </div>
        </section>
    );
}
