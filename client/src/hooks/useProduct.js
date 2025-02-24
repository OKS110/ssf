import React, { useContext } from "react";
import axios from "axios";
import { ProductContext } from "../context/ProductContext.js"

export function useProduct() {
    const { productList, setProductList, pidItem, setPidItem } = useContext(ProductContext);

    /** 상품 데이터 전체 호출 **/
    const getProductList = async() => {
        const result = await axios.post("http://localhost:9000/product/all");
        setProductList(result.data);
    }

    /** 상품 아이디 별 데이터 호출 **/
    const getPidItem = async(pid) => {
        const result = await axios.post("http://localhost:9000/product/item", {"pid": pid});
        
        setPidItem(result.data);
    }

    return { getProductList, getPidItem };
}