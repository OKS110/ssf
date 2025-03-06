import { useContext } from "react";
import { DetailProductContext } from "../context/DetailProductContext.js";
import axios from "axios";

export function useCart() {
    const { cartList, setCartList, userId, setUserId } = useContext(DetailProductContext);

    // 아이디 번호 호출
    const getCustomerId = async() => {
        const id = localStorage.getItem("user_id");
        const result = await axios.post("http://localhost:9000/cart/getId", {"id": id});
        // console.log("result --> ", result);
        setUserId(result.data);

        return result.data;
    }

    // 카트 전체 상품 호출(아이디별)
    const getCartItems = async() => {
        const id = await getCustomerId();
        const result = await axios.post("http://localhost:9000/cart/items", {"id": id});
        setCartList(result.data);
    }

    // 카트 상품 추가
    const saveToCart = async(formData) => {
        const result = await axios.post("http://localhost:9000/cart/add", formData);

        result.data.result_row && getCartItems();
    }


    // 상품 상세 페이지 상품 수량 업데이트
    const updateDetailQty = async(cid, type, count) => {
        const result = await axios.post("http://localhost:9000/cart/updateQty", {"cid": cid, "type": type, "count": count});
        result.data.result_rows && getCartItems();

        return result.data.result_rows;
    }

    // 장바구니 페이지 상품 수량 변경
    const changeQty = async(cid, count) => {
        const result = await axios.post("http://localhost:9000/cart/changeQty", {"cid": cid, "count": count});
    }

    return { saveToCart, getCustomerId, getCartItems, updateDetailQty, changeQty };
}