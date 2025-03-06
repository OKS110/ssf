import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import OrderContents from '../components/Order/OrderContents.jsx';
import OrderCertify from "../components/Order/OrderCertify.jsx";
import OrderModal from "../components/Order/OrderModal.jsx";
import axios from "axios";
import ReactModal from "react-modal";
import { useProduct } from "../hooks/useProduct.js";
import { ProductContext } from '../context/ProductContext.js';
import { useCustomers } from "../hooks/useCustomers.js"; 
import { CustomersContext } from "../context/CustomersContext.js";
import { useGuests } from "../hooks/useGuest.js";
import { GuestContext } from "../context/GuestContext.js";
import { OrderContext } from "../context/OrderContext.js";
import { useOrder } from "../hooks/useOrder.js";

import { DetailProductContext } from "../context/DetailProductContext.js";
export default function Order() {
    const navigate = useNavigate();
    const { pid } = useParams();
    const { pidItem } = useContext(ProductContext); // ✅ 개별 상품 데이터
    const { getPidItem } = useProduct();

    const {count, selectColor, selectedSize} = useContext(DetailProductContext); // ✅ 상세페이지에서 체크한 상품 수량

    const { customer } = useContext(CustomersContext); // ✅ 고객 정보(회원)
    const { getCustomer } = useCustomers();

    const { guestList } = useContext(GuestContext); // ✅ 비회원 리스트
    const { getGuestList } = useGuests();

    const [isVerified, setIsVerified] = useState(false); // ✅ 휴대폰 인증 상태
    const [isAgreed, setIsAgreed] = useState(false); // ✅ 구매 동의 상태

    const {orderList, setOrderList,
        orderPrice, setOrderPrice,
        member, setMember } = useContext(OrderContext);
    const { saveToOrder, getOrderList, saveGuestOrder } = useOrder();  // ✅ 주문 데이터(테이블 insert)

    const [localToken, setLocalToken] = useState(localStorage.getItem('token')); // 로컬 토큰 확인

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
    const detail_addressRef = useRef(null);
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
        const storedToken = localStorage.getItem("token");
        setLocalToken(storedToken); // 토큰 상태 업데이트
        setToken(storedToken); // 회원/비회원 구분용 토큰 상태 업데이트
    
        if (storedToken && customer && Object.keys(customer).length > 0) { // 고객 정보를 가져와서 폼 업데이트를 하는데 바로 이전에 로그아웃을 했는데도 비회원일 때 바로 이전 회원 정보가 form에 저장됨.
            setFormData((prevFormData) => ({
                ...prevFormData,
                name: customer?.name || "",
                phone: customer?.phone || "",
                email: customer?.email || "",
                address: customer?.address || "",
                zipcode: customer?.zipcode || "",
                detail_address: customer?.additional_address || "",
            }));
        }
    }, [customer]); // customer가 변경될 때만 실행
    

    const isAuthorized = token && !token.startsWith("guest_token_"); // 회원 비회원 여부 확인

    // ✅ 유효성 검사 함수
    const validateOrder = () => {
        let missingFields = [];

        if (!formData.name || !nameRef.current?.value) missingFields.push("이름");
        if (!formData.phone || !phoneRef.current?.value) missingFields.push("휴대폰 번호");
        if (!formData.email || !emailRef.current?.value) missingFields.push("이메일");
        if (!formData.address || !addressRef.current?.value) missingFields.push("배송 주소");
        if (!formData.detail_address || !detail_addressRef.current?.value) missingFields.push("배송 상세 주소");
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
            setIsVerified(true); // ✅ 토큰이 존재하면 인증 완료로 설정 (휴대폰 인증)
        }
    }, []);

    // ✅ 주문폼 제출 핸들러
    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        console.log("결제 버튼 클릭 - 현재 토큰:", token);


        if (!isVerified) { // 휴대폰 인증(토큰이 없을 때)
            alert("휴대폰 인증을 먼저 완료해주세요.");
            return;
        }

        if (!validateOrder()) { // 폼 유효성 검사
            return;
        }

        // ✅ 주문 데이터 객체 생성
        const orderData = {
            brand: pidItem?.brand || "브랜드 정보 없음",
            title: pidItem?.title || "상품명 없음",
            total_price: Number(pidItem?.saleprice.replace(/,/g, "")) || 0, // ✅ 쉼표 제거 후 숫자로 변환
            size: Array.isArray(pidItem?.size) && selectedSize !== null ?pidItem.size[selectedSize].name  : "사이즈 미선택",
            color: Array.isArray(pidItem?.color) && selectColor !== null ? pidItem.color[selectColor] : "색상 미선택",
            quantity: count || 1,
            zipcode: formData.zipcode || null, // undefined이면 null
            shipping_address: formData.address || null,
            delivery_message: formData.message || null,
            detail_address: formData.detail_address || null,
            status: "Pending",
            refund_amount: 0,
            payment_method: selectedPayMethod || null,
        };
        console.log("📌 최종 주문 데이터:", orderData);
        // console.log("📌 사이즈 데이터:", pidItem.size[selectedSize].name );

        try{
            if(isAuthorized){ // 회원일 때 회원 주문 저장
                await saveToOrder({ ...orderData, customer_id: customer.customer_id }); // ✅ MYSQL orders 테이블에 삽입. (회원)
            }else { //비회원일 때
                // ✅ 비회원 주문 처리
                const guestData = { //비회원 테이블에 넣을 폼 형성
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address,
                    zipcode: formData.zipcode,
                    detail_address: formData.detail_address
                    // order_number는 백엔드에서 생성
                };
    
                // ✅ 서버에서 비회원 저장 후 gid 반환
                    const response = await saveGuestOrder(guestData, orderData);
                    const guestId = response.guest_id;
                    console.log("로컬스토리지에 들어갈 gid", response);
                    
                    localStorage.setItem("guest_id", guestId); //gid 로컬 스토리지에 저장
                    console.log("📌 guest_id가 localStorage에 저장됨:", guestId);
            }

            if (!isAgreed) {
                alert("구매 동의에 체크해주세요.");
                return;
            }
            setIsModalOpen(true); // 마이페이지로 이동하는 모달 창
        }catch(error){
            console.error("❌ 주문 처리 중 오류 발생:", error);
        }
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
                                    <td>
                                        <p>브랜드 : {pidItem.brand}</p>
                                        <p>상품명 : {pidItem.title}</p>
                                        <p>
                                            사이즈: 
                                            {Array.isArray(pidItem.size) && selectedSize !== null && selectedSize < pidItem.size.length
                                                ? pidItem.size[selectedSize].name 
                                                : "사이즈 미선택"}
                                        </p>
                                        <p>
                                            색상: 
                                            {Array.isArray(pidItem.color) && selectColor !== null && selectColor < pidItem.color.length
                                                ? pidItem.color[selectColor] 
                                                : "색상 미선택"}
                                        </p>
                                        <p>수량 : {count}</p>
                                    </td>

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
                        refs={{ nameRef, phoneRef, emailRef, addressRef, detail_addressRef, messageRef }}
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
