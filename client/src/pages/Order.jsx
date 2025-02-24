import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OrderContents from '../components/Order/OrderContents.jsx';
import OrderCertify from "../components/Order/OrderCertify.jsx";
import OrderModal from "../components/Order/OrderModal.jsx";
import ReactModal from "react-modal";

export default function Order() {
    const navigate = useNavigate();

    // 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 주문할 상품 리스트
    const orderItems = [
        { id: 1, image: "https://via.placeholder.com/100", name: "상품 A", discount: "10%", shipping: "무료 배송", price: "10000" },
        { id: 2, image: "https://via.placeholder.com/100", name: "상품 B", discount: "5%", shipping: "유료 배송 (₩3,000)", price: "20000" }
    ];

    // `formData` 상태 유지
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        message: ""
    });

    // 입력 필드 값을 추적할 refs 생성 (유효성 검사 시 사용)
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const messageRef = useRef(null);

    const [token, setToken] = useState(null);
    const [selectedPayMethod, setSelectedPayMethod] = useState("CREDIT_CARD_PAY");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        console.log("현재 토큰 상태:", storedToken);
    }, []);

    const isAuthorized = !!token; // 토큰이 있으면 true, 없으면 false

    // ref 유효성 검사
    const validateOrder = () => {
        let missingFields = [];

        if (!formData.name || !nameRef.current?.value) missingFields.push("이름");
        if (!formData.phone || !phoneRef.current?.value) missingFields.push("휴대폰 번호");
        if (!formData.email || !emailRef.current?.value) missingFields.push("이메일");
        if (!formData.address || !addressRef.current?.value) missingFields.push("배송 주소");
        if (!formData.message || !messageRef.current?.value) missingFields.push("배송 메시지");

        if (missingFields.length > 0) {
            console.log("입력되지 않은 필드:", missingFields.join(", "));
            alert(`다음 항목을 입력해주세요: ${missingFields.join(", ")}`);
            return false;
        }

        return true;
    };

    // 주문폼 제출 핸들러
    const handleOrderSubmit = (e) => {
        e.preventDefault();

        console.log("결제 버튼 클릭 - 현재 토큰:", token);

        if (!isAuthorized) {
            alert("로그인 또는 휴대폰 인증을 완료해주세요.");
            return;
        }

        const agreeCheckbox = document.getElementById("btnAgreePurchase");
        if (!agreeCheckbox.checked) {
            alert("구매 동의에 체크해주세요.");
            return;
        }

        if (!validateOrder()) {
            return;
        }

        console.log("상품 정보:", orderItems);
        console.log("선택된 결제 수단:", selectedPayMethod);
        console.log("입력 폼 정보:", formData);

        alert("결제완료");
   
        // 모달 열기
        setIsModalOpen(true);
    };

    // 주문 내역 확인 버튼 클릭 시 마이페이지로 이동
    const handleConfirmOrder = () => {
        setIsModalOpen(false);
        navigate("/person");
    };
    return (
        <section id="order" className="content-wrap content-wrap-padding">
            <h1>주문/결제</h1>
            <div className="form_wrap">
                <form onSubmit={handleOrderSubmit}>
                    <table className="grid_wrap goods" style={{ backgroundColor: "yellow" }}>
                        <thead>
                            <tr>
                                <th colSpan="2">상품정보</th>
                                <th>할인/혜택</th>
                                <th>배송 정보</th>
                                <th>주문금액</th>
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

                    {!isAuthorized && <OrderCertify />}

                    <OrderContents
                        formData={formData}
                        setFormData={setFormData}
                        orderItems={orderItems}
                        handleOrderSubmit={handleOrderSubmit}
                        selectedPayMethod={selectedPayMethod}
                        setSelectedPayMethod={setSelectedPayMethod}
                        refs={{ nameRef, phoneRef, emailRef, addressRef, messageRef }}
                    />
                </form>
            </div>

            {/* 결제 성공 시 주문내역 확인 모달 */}
            <OrderModal
            isModalOpen={isModalOpen}
            handleConfirmOrder={handleConfirmOrder}
            setIsModalOpen={setIsModalOpen}/>
        </section>
    );
}
