import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import axios from 'axios';

export function useOrder() {
    const { orderList, setOrderList,
            orderPrice, setOrderPrice,
            member, setMember
        } = useContext(OrderContext);

    /** useContext로 관리되는 객체들의 CRUD 함수 정의 */
    /**
     * 전체 주문정보 가져오기 : getOrderList
     */
    const getOrderList = async(id) => {
        // const id = localStorage.getItem("user_id"); // dxzf76
        const result = await axios.post("http://localhost:9000/order/all", {"id": id});  //해당 아이디의 주문 정보
        // console.log('order list-->', result.data);
        setOrderList(result.data);
        setMember(result.data[0]);
        
        return result.data;
    }
    
    /**    회원 주문 정보 저장 */
    const saveToOrder = async(orderData) => {
        
        const result = await axios.post("http://localhost:9000/order/add", orderData);  
        // console.log('order add : result --> ', result.data);

    };

    /**    비회원 주문 정보 저장 */
    const saveGuestOrder = async (guestData, orderData) => {
        try {
            // guests 테이블에 비회원 정보 저장
            const guestResponse = await axios.post("http://localhost:9000/guest/add", guestData);
            console.log("   [DEBUG] 비회원 추가 응답:", guestResponse.data);
    
            const guestId = guestResponse.data.gid; // 자동 생성된 guest_id 가져오기
    
            if (!guestId) {
                console.error("ERROR guest_id가 응답에서 없음");
                return { error: "guest_id가 생성되지 않았습니다." };
            }
    
            //    guest_id를 localStorage에 저장
            localStorage.setItem("guest_id", guestId);
            // console.log(" guest_id가 localStorage에 저장됨:", guestId);
    
            // guest_orders 테이블에 주문 데이터 저장
            const guestOrderData = {
                guest_id: guestId,
                ...orderData
            };
    
            const orderResponse = await axios.post("http://localhost:9000/guest/addOrder", guestOrderData);
            // console.log(" 비회원 주문 저장 완료:", orderResponse.data);
    
            return { guest_id: guestId, orders: orderResponse.data };
        } catch (error) {
            console.error("ERROR 비회원 주문 처리 중 오류 발생:", error);
            return { error: error.message };
        }
    };
    
//    장바구니에서 선택한 상품 가져오기
    const getCartOrderItems = async (selectedCids) => {
        try {
            const response = await axios.post("http://localhost:9000/order/cartOrderItems", {
                cids: selectedCids,
            });
            //    서버에서 가져온 데이터에 `deliveryFee` 추가
            const updatedItems = response.data.map(item => ({
                ...item,
                deliveryFee: item.deliveryFee || "free" //   기본값 "free" 설정
            }));
            console.log(updatedItems);
            return updatedItems;
        } catch (error) {
            console.error("ERROR 장바구니 주문 상품 가져오기 실패:", error);
            return [];
        }
    };
    const saveCartOrders = async (orderDataList) => {
        try {
            await axios.post("http://localhost:9000/order/addCartOrders", { orders: orderDataList });
        } catch (error) {
            console.error("ERROR 장바구니 주문 저장 중 오류 발생:", error);
        }
    };
    const deleteOrderedCartItems = async (customerId, orderedItems) => {
        try {
            const response = await axios.post("http://localhost:9000/order/deleteOrderedItems", {
                customer_id: customerId,
                orderedItems: orderedItems, // 주문한 상품 리스트
            });
    
            console.log("   장바구니에서 주문된 상품 삭제 완료:", response.data);
        } catch (error) {
            console.error("ERROR 장바구니에서 주문된 상품 삭제 중 오류 발생:", error);
        }
    };
    return { getOrderList, saveToOrder, saveGuestOrder, saveCartOrders, getCartOrderItems,
        deleteOrderedCartItems
     };
}

