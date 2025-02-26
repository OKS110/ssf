import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import OrderContents from '../components/Order/OrderContents.jsx';
import OrderCertify from "../components/Order/OrderCertify.jsx";
import OrderModal from "../components/Order/OrderModal.jsx";
import { useProduct } from "../hooks/useProduct.js";
import { ProductContext } from '../context/ProductContext.js';
import { useCustomers } from "../hooks/useCustomers.js"; 
import { CustomersContext } from "../context/CustomersContext.js";
import { useGuests } from "../hooks/useGuest.js";
import { GuestContext } from "../context/GuestContext.js";

export default function Order() {
    const navigate = useNavigate();
    const { pid } = useParams();
    const { pidItem } = useContext(ProductContext); // 개별 상품 데이터
    const { getPidItem } = useProduct();

    const { customer } = useContext(CustomersContext); // 고객 정보
    const { getCustomer } = useCustomers();

    const { guestList } = useContext(GuestContext); // 비회원 리스트
    const { getGuestList } = useGuests();

    // ✅ formData 상태 추가 (기본값: 빈 문자열)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        message: "",
        zipcode: "",
        detail_address: "",
    });

    // ✅ 입력 필드 추적을 위한 useRef
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const messageRef = useRef(null);

    const [token, setToken] = useState(null);
    const [selectedPayMethod, setSelectedPayMethod] = useState("CREDIT_CARD_PAY");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ localStorage에서 유저 정보를 가져와 고객 정보를 불러옴
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const storedUserId = localStorage.getItem("user_id");
                if (!storedUserId) {
                    console.warn("⚠️ user_id가 localStorage에 없습니다.");
                    return;
                }
                console.log("📌 localStorage에서 가져온 user_id:", storedUserId);
                await getCustomer(storedUserId); // 고객 데이터 불러오기
            } catch (error) {
                console.error("❌ 고객 데이터 가져오기 실패:", error);
            }
        };

        fetchCustomer();
    }, []);

    // ✅ 비회원 리스트 가져오기
    useEffect(() => {
        const fetchGuestList = async () => {
            try {
                await getGuestList();
            } catch (error) {
                console.error("❌ 비회원 데이터 가져오기 실패:", error);
            }
        };

        fetchGuestList();
    }, []);

    // ✅ 상품 데이터 가져오기
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                await getPidItem(pid);
            } catch (error) {
                console.error("❌ 상품 데이터 가져오기 실패:", error);
            }
        };

        if (pid) {
            fetchProductData();
        }
    }, [pid]);

    // ✅ 고객 정보가 로드되면 `formData`를 자동 업데이트
    useEffect(() => {
        if (customer) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                name: customer.name || "",
                phone: customer.phone || "",
                email: customer.email || "",
                address: customer.address || "",
                zipcode: customer.zipcode || "",
                detail_address: customer.additional_address || "",
            }));
        }
    }, [customer]);

    // ✅ 비회원 정보가 로드되면 `formData` 자동 업데이트
    useEffect(() => {
        if (token?.startsWith("guest_token_") && guestList.length > 0) {
            const latestGuest = guestList[guestList.length - 1]; // 마지막 비회원 데이터
            setFormData((prevFormData) => ({
                ...prevFormData,
                name: latestGuest.name || "",
                phone: latestGuest.phone || "",
                email: latestGuest.email || "",
                address: latestGuest.address || "",
                zipcode: latestGuest.zipcode || "",
                detail_address: latestGuest.detail_address || "",
            }));
        }
    }, [guestList, token]);

    // ✅ 유효성 검사 함수 (validateOrder)
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

    // ✅ 주문폼 제출 핸들러
    const handleOrderSubmit = (e) => {
        e.preventDefault();

        console.log("결제 버튼 클릭 - 현재 토큰:", token);

        if (!validateOrder()) {
            return;
        }

        // ✅ 주문 데이터 객체 생성
        const orderData = {
            customer_id: token?.startsWith("guest_token_") ? "guest_0000" : localStorage.getItem("customer_id"),
            guest_id: token?.startsWith("guest_token_") ? `guest_${Date.now()}` : null,
            order_number: `ORD-${Date.now()}`,
            total_price: pidItem?.saleprice || 0,
            zipcode: formData.zipcode || "",
            shipping_address: formData.address || "",
            detail_address: formData.detail_address || "",
            status: "Pending",
            refund_amount: 0,
            payment_method: selectedPayMethod,
        };

        console.log("📌 최종 주문 데이터:", orderData);
        alert("결제완료");
        setIsModalOpen(true);
    };

    return (
        <section id="order" className="content-wrap content-wrap-padding">
            <h1>주문/결제</h1>
            <div className="form_wrap">
                <form onSubmit={handleOrderSubmit}>
                    <OrderContents
                        formData={formData}
                        setFormData={setFormData}
                        orderItems={pidItem}
                        selectedPayMethod={selectedPayMethod}
                        setSelectedPayMethod={setSelectedPayMethod}
                        refs={{ nameRef, phoneRef, emailRef, addressRef, messageRef }}
                    />
                </form>
            </div>

            <OrderModal isModalOpen={isModalOpen} handleConfirmOrder={() => navigate("/person")} setIsModalOpen={setIsModalOpen} />
        </section>
    );
}
