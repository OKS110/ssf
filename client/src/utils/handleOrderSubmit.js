import { validateOrder } from "./validate.js";

// 주문 결제 함수
export const handleOrderSubmit = async ({
    formData, 
    formRefs, 
    token, 
    isVerified, 
    isAuthorized, 
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
    setIsModalOpen
}) => {
    console.log("  결제 버튼 클릭 - 현재 토큰:", token);

    if (!isVerified) {
        alert("휴대폰 인증을 먼저 완료해주세요.");
        return;
    }

    //    유효성 검사
    if (!validateOrder(formData, formRefs.current)) {
        return;
    }

    let orderDataList = [];

    //    개별 구매 상품 (바로구매)
    if (pidItem) {
        orderDataList.push({
            brand: pidItem?.brand || "브랜드 정보 없음",
            title: pidItem?.title || "상품명 없음",
            total_price: (typeof pidItem.saleprice === "string" 
                ? Number(pidItem.saleprice.replace(/,/g, "")) 
                : Number(pidItem.saleprice) || 0) * count,
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

    //    장바구니에서 선택한 상품 추가 (기존 데이터 버리고 최신 데이터만 포함)
    if (isAuthorized && location.pathname === "/cart/order" && cartOrderItems.length > 0) {
        console.log("  [DEBUG] 장바구니에서 가져온 최신 데이터:", cartOrderItems);

        const validCartOrders = cartOrderItems.map(item => ({
            product_id: item.product_id,
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

        orderDataList = [...validCartOrders];
    }

    console.log("  [DEBUG] 최종 주문 데이터:", orderDataList);

    try {
        //    비회원 정보 정의
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
            console.log("  [DEBUG] 비회원 정보:", guestData);
        }

        //    카카오페이 결제 요청
        if (orderDataList[0]?.payment_method === "kakao") {
            await handleKakaoPayment(orderDataList, isAuthorized ? customer : guestData);
        }

        //    주문 정보 저장 (회원/비회원 분기 처리)
        if (isAuthorized) {
            await saveToOrder(orderDataList.map(order => ({ ...order, customer_id: customer.customer_id })));
            await deleteOrderedCartItems(customer.customer_id, orderDataList);
        } else {
            console.log("  [DEBUG] 비회원 주문 데이터:", orderDataList);
            await saveGuestOrder(guestData, orderDataList);
        }

        //    구매 동의 확인 후 모달 열기
        if (!isAgreed) {
            alert("구매 동의에 체크해주세요.");
            return;
        }

        setIsModalOpen(true);
    } catch (error) {
        console.error("ERROR 주문 처리 중 오류 발생:", error);
    }
};
