import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
// import { useCart } from '../hooks/useCart.js';
import axios from 'axios';

export function useOrder() {
    // const { calculateTotalPrice } = useCart();
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
        console.log('order list-->', result.data);
        setOrderList(result.data);
        setMember(result.data[0]);
        // calculateTotalPrice(result.data);
        
        return result.data;
    }
    
    /** ✅ 회원 주문 정보 저장 */
    const saveToOrder = async(orderData) => {
        
        const result = await axios.post("http://localhost:9000/order/add", orderData);  
        console.log('order add : result --> ', result.data);
        // setOrderList(result.data);
        // setMember(result.data[0]);
    };

    /** ✅ 비회원 주문 정보 저장 */
    const saveGuestOrder = async (guestData, orderData) => {
        try {
            // 1️⃣ guests 테이블에 비회원 정보 저장
            const guestResponse = await axios.post("http://localhost:9000/guest/add", guestData);
            const guestId = guestResponse.data.gid; // 자동 생성된 guest_id 가져오기
            console.log("✅ 비회원 저장 완료, guest_id:", guestId);

            // 2️⃣ guest_orders 테이블에 주문 데이터 저장
            const guestOrderData = {
                guest_id: guestId,  // 가져온 guest_id 추가
                ...orderData        // 주문 데이터 포함
            };
            console.log("guestOrderData", guestOrderData);
            
            const orderResponse = await axios.post("http://localhost:9000/guest/addOrder", guestOrderData);
            console.log("✅ 비회원 주문 저장 완료:", orderResponse.data);

            return orderResponse.data;
        } catch (error) {
            console.error("❌ 비회원 주문 처리 중 오류 발생:", error);
            throw error;
        }
    };
    return { getOrderList, saveToOrder, saveGuestOrder };
}

