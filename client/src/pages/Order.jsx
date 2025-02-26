import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import OrderContents from '../components/Order/OrderContents.jsx';
import OrderCertify from "../components/Order/OrderCertify.jsx";
import OrderModal from "../components/Order/OrderModal.jsx";
<<<<<<< HEAD
import axios from "axios";
import ReactModal from "react-modal";
=======
>>>>>>> 1b73f6f15f10d41e40a2c13b8750375642774cf2
import { useProduct } from "../hooks/useProduct.js";
import { ProductContext } from '../context/ProductContext.js';
import { useCustomers } from "../hooks/useCustomers.js"; 
import { CustomersContext } from "../context/CustomersContext.js";
import { useGuests } from "../hooks/useGuest.js";
import { GuestContext } from "../context/GuestContext.js";

export default function Order() {
    const navigate = useNavigate();
    const { pid } = useParams();
    const { pidItem } = useContext(ProductContext); // ✅ 개별 상품 데이터
    const { getPidItem } = useProduct();

    const { customer } = useContext(CustomersContext); // ✅ 고객 정보
    const { getCustomer } = useCustomers();

    const { guestList } = useContext(GuestContext); // ✅ 비회원 리스트
    const { getGuestList } = useGuests();

    const [isVerified, setIsVerified] = useState(false); // ✅ 휴대폰 인증 상태
    const [isAgreed, setIsAgreed] = useState(false); // ✅ 구매 동의 상태

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        message: "",
        zipcode: "",
        detail_address: "",
    });

    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const messageRef = useRef(null);

    const [token, setToken] = useState(null);
    const [selectedPayMethod, setSelectedPayMethod] = useState("CREDIT_CARD_PAY");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ 회원 정보 가져오기
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const storedUserId = localStorage.getItem("user_id");
                if (!storedUserId) {
                    console.warn("⚠️ user_id가 localStorage에 없습니다.");
                    return;
                }
                console.log("📌 localStorage에서 가져온 user_id:", storedUserId);
                await getCustomer(storedUserId);
            } catch (error) {
                console.error("❌ 고객 데이터 가져오기 실패:", error);
            }
        };

        fetchCustomer();
    }, []);

    // ✅ 비회원 정보 가져오기
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

    // ✅ 상품 정보 가져오기
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

    // ✅ 회원 정보가 로드되면 `formData`를 자동 업데이트
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

    // ✅ 토큰 여부 설정
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const isAuthorized = token && !token.startsWith("guest_token_");

    // ✅ 유효성 검사 함수
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

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setIsVerified(true); // ✅ 토큰이 존재하면 인증 완료로 설정
        }
    }, []);

    // ✅ 주문폼 제출 핸들러
    const handleOrderSubmit = (e) => {
        e.preventDefault();

        console.log("결제 버튼 클릭 - 현재 토큰:", token);


        if (!isVerified) {
            alert("휴대폰 인증을 먼저 완료해주세요.");
            return;
        }

        if (!validateOrder()) {
            return;
        }

        // ✅ 주문 데이터 객체 생성
        const orderData = {
            ...(isAuthorized 
                ? {customer_id: customer.customer_id}  // 🔹 로그인된 경우 -> orders 테이블로 값 전달
                : { guest_id: `guest_${Date.now()}`}  // 🔹 비회원인 경우 -> guest_orders 테이블로 값 전달
            ),
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


        if (!isAgreed) {
            alert("구매 동의에 체크해주세요.");
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <section id="order" className="content-wrap content-wrap-padding">
            <h1>주문/결제</h1>
            <div className="form_wrap">
                <form onSubmit={handleOrderSubmit}>
                    {/* ✅ 상품 정보 테이블 */}
                    <table className="grid_wrap goods">
                        <thead>
                            <tr>
                                <th colSpan="2">상품정보</th>
                                <th>할인/혜택</th>
                                <th>배송 정보</th>
                                <th>주문금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pidItem && (
                                <tr key={pidItem.pid}>
                                    <td>
                                        <img src={pidItem.image?.[0]} alt={pidItem.title || "상품 이미지"} style={{ width: "100px" }} />
                                    </td>
                                    <td>{pidItem.title}</td>
                                    <td>{pidItem.discount}%</td>
                                    <td>{pidItem.deliveryFee}</td>
                                    <td>{pidItem.saleprice}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* ✅ 비회원이면 휴대폰 인증 표시 */}
                    {!isAuthorized && <OrderCertify />}

                    <OrderContents
                        formData={formData}
                        setFormData={setFormData}
                        orderItems={pidItem}
                        selectedPayMethod={selectedPayMethod}
                        setSelectedPayMethod={setSelectedPayMethod}
                        refs={{ nameRef, phoneRef, emailRef, addressRef, messageRef }}
                        isAgreed={isAgreed} // ✅ 구매동의 버튼 상태 전달
                        setIsAgreed={setIsAgreed} // ✅ 구매 동의 버튼 상태 업데이트 함수 전달
                        isVerified={isVerified} // ✅ 휴대폰 인증 상태 전달
                    />
                </form>
            </div>

            <OrderModal isModalOpen={isModalOpen} handleConfirmOrder={() => navigate("/person")} setIsModalOpen={setIsModalOpen} />
        </section>
    );
}
