import { useContext } from "react";
import { DetailProductContext } from "../context/DetailProductContext.js";
import axios from "axios";

export function useCart() {
    const { cartList, setCartList, userId, setUserId } = useContext(DetailProductContext);

    // 아이디 번호 호출
    const getCustomerId = async(id) => {
        const result = await axios.post("http://localhost:9000/cart/getId", {id});
        setUserId(result.data);
    }

    // 카트 상품 추가
    const saveToCart = async(formData) => {
        const result = await axios.post("http://localhost:9000/cart/add", formData);
        console.log("result --> ", result.data);
    }

    // 카트 전체 상품 호출
    // const getCartItems = async(id) => {
    //     await getCustomerId(id);
    //     const result = await axios.post("http://localhost:9000/cart/items", {userId});
    // }
    // const getCartItems = async(userId) => {
    //     const result = await axios.post("http://localhost:9000/cart/items", {userId});
    // }

    return { saveToCart, getCustomerId };
}