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
import { OrderContext } from "../context/OrderContext.js";
import { useOrder } from "../hooks/useOrder.js";
import { useKakaoPayment } from "../hooks/useKaKaoPayment.js";
import { useLocation } from "react-router-dom";
import { DetailProductContext } from "../context/DetailProductContext.js";
import { useCart } from "../hooks/useCart.js";
import axios from "axios";
export default function Order() {
    const navigate = useNavigate();
    const location = useLocation();
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
    const { getCartItems } = useCart();
    const { saveToOrder, saveCartOrders, getOrderList,
         saveGuestOrder, getCartOrderItems, deleteOrderedCartItems } = useOrder();  // ✅ 주문 데이터(테이블 insert)
    const [cartOrderItems, setCartOrderItems] = useState([]);

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
    const { handleKakaoPayment, loading, error } = useKakaoPayment(); // ✅ 커스텀 훅 사용
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [orderSummary, setOrderSummary] = useState({
        totalPrice: 0,
        totalDiscount: 0,
        totalDeliveryFee: 0,
        finalPrice: 0,
    });
        // ✅ 장바구니 데이터가 변경될 때마다 주문 총합 재계산
    useEffect(() => {
        if (cartOrderItems.length > 0) {
            const summary = calculateOrderSummary(cartOrderItems);
            setOrderSummary(summary);
        }
    }, [cartOrderItems]);
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


    // ✅ 장바구니에서 선택한 상품들 가져오기
    useEffect(() => {
        // ✅ sessionStorage에서 선택된 상품 CIDs 불러오기
        const selectedCids = JSON.parse(sessionStorage.getItem("selectedCids") || "[]");

        console.log("📌 선택된 CIDs:", selectedCids);

        // ✅ 선택한 상품이 있을 경우 API 호출하여 데이터 가져오기
        if (location.pathname === "/cart/order" && selectedCids.length > 0) {
            getCartOrderItems(selectedCids)
                .then((items) => {
                    setCartOrderItems(items);
                    console.log("✅ 서버에서 가져온 장바구니 주문 상품:", items);
                })
                .catch((error) => console.error("❌ 주문 상품 로딩 실패:", error));
        }
    }, [location]);

    useEffect(() => {
        if (cartOrderItems.length > 0) {
            console.log("📌 [DEBUG] 장바구니 주문 상품 (중복 확인 전):", cartOrderItems);
    
            // ✅ 기존 상태와 비교하여 변경이 있을 때만 상태 업데이트
            const uniqueCartItems = cartOrderItems.filter((item, index, self) =>
                index === self.findIndex((o) => 
                    o.name === item.name && o.size === item.size && o.color === item.color
                )
            );
    
            // ✅ 상태가 변경될 경우에만 업데이트하여 무한 렌더링 방지
            if (JSON.stringify(cartOrderItems) !== JSON.stringify(uniqueCartItems)) {
                console.log("✅ [DEBUG] 중복 제거 후 장바구니 주문 상품:", uniqueCartItems);
                setCartOrderItems(uniqueCartItems);
            }
        }
    }, [cartOrderItems]);  // ✅ `cartOrderItems`가 변경될 때만 실행
    

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
    console.log("cartOrderItems =====> ", cartOrderItems);

    
    // ✅ 주문폼 제출 핸들러
    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        console.log("📌 결제 버튼 클릭 - 현재 토큰:", token);
    
        if (!isVerified) {
            alert("휴대폰 인증을 먼저 완료해주세요.");
            return;
        }
    
        if (!validateOrder()) {
            return;
        }
    
        let orderDataList = [];
    
        // ✅ 개별 구매 상품 (바로구매)
        if (pidItem) {
            orderDataList.push({
                brand: pidItem?.brand || "브랜드 정보 없음",
                title: pidItem?.title || "상품명 없음",
                total_price: ((typeof pidItem.saleprice === "string" 
                    ? Number(pidItem.saleprice.replace(/,/g, "")) 
                    : Number(pidItem.saleprice) || 0) * count) ?? 0,
                size: selectedSize,
                color: selectColor,
                quantity: count || 1,
                zipcode: formData.zipcode || null,
                shipping_address: formData.address || null,
                delivery_message: formData.message || null,
                detail_address: formData.detail_address || null,
                status: "Pending",
                refund_amount: 0,
                payment_method: selectedPayMethod || null,
            });
        }
    
        // ✅ 장바구니에서 선택한 상품 추가 (기존 데이터 버리고 최신 데이터만 포함)
        if (isAuthorized && location.pathname === "/cart/order" && cartOrderItems.length > 0) {
            console.log("📌 [DEBUG] 장바구니에서 가져온 최신 데이터:", cartOrderItems);
    
            // ✅ 옵션(size, color)이 정상적으로 선택된 상품만 포함
            const validCartOrders = cartOrderItems.map(item => ({
                product_id: item.product_id, // ✅ product_id 추가
                brand: item.brand || "브랜드 정보 없음",
                title: item.name || "상품명 없음",
                total_price: item.discounted_price * item.quantity,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
                zipcode: formData.zipcode || null,
                shipping_address: formData.address || null,
                delivery_message: formData.message || null,
                detail_address: formData.detail_address || null,
                status: "Pending",
                refund_amount: 0,
                payment_method: selectedPayMethod || null,
            }));
    
            console.log("📌 [DEBUG] 필터링 후 유효한 주문 데이터:", validCartOrders);
    
            // ✅ 기존 orderDataList와 병합하지 않고, 최신 장바구니 데이터만 사용
            orderDataList = [...validCartOrders];
        }
    
        console.log("📌 [DEBUG] 최종 주문 데이터 (중복 제거 후, 최신 데이터만 사용):", orderDataList); // 배열
        try {
            // ✅ 비회원 정보 정의 (필요한 경우)
            let guestData = null;
            if (!isAuthorized) {
                guestData = {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address,
                    zipcode: formData.zipcode,
                    detail_address: formData.detail_address
                };
                console.log("📌 [DEBUG] 비회원 정보:", guestData);
            }
        
            // ✅ 카카오페이 결제 요청
            if (orderDataList[0].payment_method === "kakao") {
                
                if (isAuthorized) {
                    await handleKakaoPayment(orderDataList, customer);
                } else {
                    await handleKakaoPayment(orderDataList, guestData);
                }
            }
        
            // ✅ 주문 정보 저장 (회원/비회원 분기 처리)
            if (isAuthorized) {
                await saveToOrder(orderDataList.map(order => ({ ...order, customer_id: customer.customer_id })));
                await deleteOrderedCartItems(customer.customer_id, orderDataList); // ✅ 주문된 상품 장바구니에서 삭제
            } else {
                console.log("📌 [DEBUG] 비회원 주문 데이터:", orderDataList);
                await saveGuestOrder(guestData, orderDataList);
            }
        
            // ✅ 구매 동의 확인 후 모달 열기
            if (!isAgreed) {
                alert("구매 동의에 체크해주세요.");
                return;
            }
        
            setIsModalOpen(true);
        } catch (error) {
            console.error("❌ 주문 처리 중 오류 발생:", error);
        }
        
    };
    

    // ✅ 주문 가격 합계를 계산하는 함수
    const calculateOrderSummary = (items) => {
        let totalPrice = 0;
        let totalDiscount = 0;
        let totalDeliveryFee = 0;
        let finalPrice = 0;
    
        items.forEach((item) => {
            const originalPrice = Number((item.original_price || "0").toString().replace(/,/g, "")) * (item.quantity || 1);
            const discountedPrice = Number((item.discounted_price || "0").toString().replace(/,/g, "")) * (item.quantity || 1);
            const discountAmount = originalPrice - discountedPrice;
    
            totalPrice += originalPrice;
            totalDiscount += discountAmount;
            totalDeliveryFee += item.delivery_fee === "free" ? 0 : 3000; // ✅ `deliveryFee` 반영
        });
    
        finalPrice = totalPrice + totalDeliveryFee - totalDiscount;
    
        return { totalPrice, totalDiscount, totalDeliveryFee, finalPrice };
    };
    
    
    console.log(" cartOrderItems",  cartOrderItems); 

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
    {/* ✅ 개별 구매(바로구매)인 경우, 장바구니 상품 안 보이게 설정 */}
    {pidItem && cartOrderItems.length === 0 && (
        <>
            <tr>
                <th colSpan="5" style={{ textAlign: "left", padding: "10px 0", fontWeight: "bold" }}>
                    바로구매 상품
                </th>
            </tr>
            <tr key={pidItem.pid}>
                <td>
                    <img src={pidItem.image?.[0]} alt={pidItem.title || "상품 이미지"} style={{ width: "100px" }} />
                </td>
                <td>
                    <p>브랜드 : {pidItem.brand}</p>
                    <p>상품명 : {pidItem.title}</p>
                    <p>색상: {selectColor}</p>
                    <p>사이즈: {selectedSize}</p>
                    <p>수량 : {count}</p>
                </td>
                <td>{pidItem.discount}%</td>
                <td>{pidItem.deliveryFee === "free" ? "무료배송" : "3000원"}</td>
                <td>
                    {/* ✅ 문자열 여부 확인 후 replace 적용 */}
                    {(
                        (typeof pidItem.saleprice === "string" 
                            ? Number(pidItem.saleprice.replace(/,/g, ""))
                            : Number(pidItem.saleprice) || 0
                        ) * count
                    ).toLocaleString()}원
                </td>
            </tr>
        </>
    )}

    {/* ✅ 장바구니에서 선택한 상품을 주문하는 경우, 개별 상품 안 보이게 설정 */}
    {cartOrderItems.length > 0 && (
        <>
            <tr>
                <th colSpan="5" style={{ textAlign: "left", padding: "10px 0", fontWeight: "bold" }}>
                    장바구니에서 선택한 상품
                </th>
            </tr>
            {cartOrderItems.map((item) => (
                <tr key={item.cid}>
                    <td>
                        <img src={item.image[0]} alt={item.name} style={{ width: "100px" }} />
                    </td>
                    <td>
                        <p>브랜드: {item.brand}</p>
                        <p>상품명: {item.name}</p>
                        <p>색상: {item.color}</p>
                        <p>사이즈: {item.size}</p>
                        <p>수량: {item.quantity}</p>
                    </td>
                    <td>{item.discount_rate}%</td>
                    <td>{item.delivery_fee === "free" ? "무료배송" : 3000}</td>
                    <td>
                        {(
                            Number(item.discounted_price) * item.quantity
                        ).toLocaleString()}원
                    </td>
                </tr>
            ))}
        </>
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
                        handleOrderSubmit={handleOrderSubmit}
                        totalPrice={orderSummary.totalPrice}
                        totalDiscount={orderSummary.totalDiscount}
                        totalDeliveryFee={orderSummary.totalDeliveryFee}
                        orderItemsToContent={cartOrderItems || []} // ✅ 장바구니에서 선택된 상품들을 전달
                        
                    />
                </form>
            </div>

            <OrderModal isModalOpen={isModalOpen} handleConfirmOrder={() => navigate("/person")} setIsModalOpen={setIsModalOpen} />
        </section>
    );
}
