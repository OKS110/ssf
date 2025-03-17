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
import {AuthContext} from '../auth/AuthContext.js';
import { useOrder } from "../hooks/useOrder.js";
import { useKakaoPayment } from "../hooks/useKaKaoPayment.js";
import { useLocation } from "react-router-dom";
import { DetailProductContext } from "../context/DetailProductContext.js";
import { calculateOrderSummary } from "../utils/orderCalculate.js";
import { handleOrderSubmit } from "../utils/handleOrderSubmit.js";
import SlideUp from "../commons/SlideUp.jsx";

// Order에서 Person으로 넘어갈 때 guest_id 발급됨
export default function Order() {
    const navigate = useNavigate();
    const location = useLocation(); //경로를 파악(장바구니, 바로구매)
    const { isLoggedIn, token } = useContext(AuthContext); //  로그인 상태 가져오기


    
    const { pid } = useParams();
    const { pidItem } = useContext(ProductContext); //  개별 상품 데이터
    const { getPidItem } = useProduct();

    const {count, selectColor, selectedSize} = useContext(DetailProductContext); //  상세페이지에서 체크한 상품 수량

    //  고객 정보
    const { customer } = useContext(CustomersContext); 
    const { getCustomer } = useCustomers();
    const { getGuestList } = useGuests();

    const [isVerified, setIsVerified] = useState(!!token); //  휴대폰 인증 상태
    const [isAgreed, setIsAgreed] = useState(false); //  구매 동의 상태


    const { saveToOrder, saveGuestOrder, getCartOrderItems, deleteOrderedCartItems } = useOrder();  //  주문 데이터(테이블 insert)
    const [cartOrderItems, setCartOrderItems] = useState([]);


    const [formData, setFormData] = useState({
        name: "", phone: "", email: "", address: "", message: "", zipcode: "", detail_address: "",
    });

// valid 처리를 위한 객체 - 하나의 객체로 관리
    const formRefs = useRef({
    name: null,
    phone: null,
    email: null,
    address: null,
    detail_address: null,
    message: null
    });

    const [selectedPayMethod, setSelectedPayMethod] = useState("CREDIT_CARD_PAY"); // 결제 수단
    const { handleKakaoPayment } = useKakaoPayment(); //  커스텀 훅 사용

    const [isModalOpen, setIsModalOpen] = useState(false); //결제 완료 시 모달창 오픈
    const [orderSummary, setOrderSummary] = useState({ //주문 결제 금액
        totalPrice: 0,
        totalDiscount: 0,
        totalDeliveryFee: 0,
        finalPrice: 0,
    });

    

    //  상품 정보 가져오기 (개별 상품 바로구매 시 필요)
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                await getPidItem(pid);
            } catch (error) {
                console.error("ERROR 상품 데이터 가져오기 실패:", error);
            }
        };

        if (pid) {
            fetchProductData();
        }
    }, [pid]);

    //  회원 정보 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (isLoggedIn) {
                    //  로그인 상태라면 회원 정보 가져오기
                    const storedUserId = localStorage.getItem("user_id");
                    if (storedUserId) {
                        // console.log(" localStorage에서 가져온 user_id:", storedUserId);
                        await getCustomer(storedUserId);
                    } else {
                        console.warn("user_id가 localStorage에 없습니다.");
                    }
                } else {
                    //  비회원 정보 가져오기
                    await getGuestList();
                }
            } catch (error) {
                console.error("ERROR 사용자 데이터 가져오기 실패:", error);
            }
        };
    
        fetchUserData();
        setIsVerified(isLoggedIn); // 휴대폰 인증상태
    }, [isLoggedIn]); //  로그인 상태가 변경될 때만 실행
    

    
    //  `customer` 정보가 변경될 때 formData 자동 업데이트
    useEffect(() => {
        if (customer && Object.keys(customer).length > 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                name: customer?.name || "",
                phone: customer?.phone || "",
                email: customer?.email || "",
                address: customer?.address || "",
                zipcode: customer?.zipcode || "",
                detail_address: customer?.detail_address || "",
            }));
        }
    }, [customer]); //  `customer`가 변경될 때만 실행
    


    //  장바구니 상품 가져오기
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                //  sessionStorage에서 선택된 상품 CIDs 불러오기
                const selectedCids = JSON.parse(sessionStorage.getItem("selectedCids") || "[]");
                // console.log(" 선택된 CIDs:", selectedCids);

                //  선택한 상품이 있을 경우 API 호출하여 데이터 가져오기
                if (location.pathname === "/cart/order" && selectedCids.length > 0) {
                    const items = await getCartOrderItems(selectedCids);
                    // console.log(" 서버에서 가져온 장바구니 주문 상품:", items);

                    //  중복 제거 로직
                    const uniqueCartItems = items.filter((item, index, self) =>
                        index === self.findIndex((o) => 
                            o.name === item.name && o.size === item.size && o.color === item.color
                        )
                    );

                    //  기존 상태와 비교하여 변경이 있을 때만 업데이트 (무한 렌더링 방지)
                    if (JSON.stringify(cartOrderItems) !== JSON.stringify(uniqueCartItems)) {
                        setCartOrderItems(uniqueCartItems);
                        // console.log(" [DEBUG] 중복 제거 후 장바구니 주문 상품:", uniqueCartItems);
                    }
                }
            } catch (error) {
                console.error("ERROR 장바구니 주문 상품 로딩 실패:", error);
            }
        };

    //  장바구니 총합 계산
    if (cartOrderItems.length > 0) {
        const summary = calculateOrderSummary(cartOrderItems);
        setOrderSummary(summary);
    }

    fetchCartItems();
}, [location, cartOrderItems]);  //  `location`과 `cartOrderItems` 변경 시 실행



    //  주문폼 제출 핸들러
//  주문폼 제출 핸들러
const onSubmitOrder = async (e) => {
    e.preventDefault();
    // 🚀 강제 업데이트 (임시 해결책)
    const storedToken = localStorage.getItem("token") || "";
    const authStatus = storedToken && !storedToken.startsWith("guest_token_");
    await handleOrderSubmit({
        formData,
        formRefs,
        token: storedToken, // 🔥 최신 token 사용
        isVerified,
        isAuthorized: authStatus, // 🔥 최신 상태 적용
        isAgreed,
        pidItem,
        count,
        selectedSize,
        selectColor,
        selectedPayMethod,
        customer,
        location,
        cartOrderItems,
        handleKakaoPayment,
        saveToOrder,
        saveGuestOrder,
        deleteOrderedCartItems,
        setIsModalOpen,
        
    });
};



    return (
        <section id="order" className="content-wrap content-wrap-padding">
            <h1>주문/결제</h1>
            <div className="form_wrap">
                <form onSubmit={handleOrderSubmit}>
                    {/*  상품 정보 테이블 */}
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
    {/*  개별 구매(바로구매)인 경우, 장바구니 상품 안 보이게 설정 */}
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
                    {/*  문자열 여부 확인 후 replace 적용 */}
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

    {/*  장바구니에서 선택한 상품을 주문하는 경우, 개별 상품 안 보이게 설정 */}
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

                    {/*  비회원이면 휴대폰 인증 표시 */}
                    {!isVerified && <OrderCertify />}

                    <OrderContents
                        formData={formData}
                        setFormData={setFormData}
                        orderItems={pidItem}
                        selectedPayMethod={selectedPayMethod}
                        setSelectedPayMethod={setSelectedPayMethod}
                        refs={ formRefs.current }
                        isAgreed={isAgreed} //  구매동의 버튼 상태 전달
                        setIsAgreed={setIsAgreed} //  구매 동의 버튼 상태 업데이트 함수 전달
                        isVerified={isVerified} //  휴대폰 인증 상태 전달
                        handleOrderSubmit={onSubmitOrder}
                        totalPrice={orderSummary.totalPrice}
                        totalDiscount={orderSummary.totalDiscount}
                        totalDeliveryFee={orderSummary.totalDeliveryFee}
                        orderItemsToContent={cartOrderItems || []} //  장바구니에서 선택된 상품들을 전달
                        
                    />
                </form>
            </div>

            <OrderModal isModalOpen={isModalOpen} handleConfirmOrder={() => navigate("/person")} setIsModalOpen={setIsModalOpen} />
            <SlideUp/>
        </section>
    );
}
