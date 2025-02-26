import React, { useContext } from "react";
import axios from "axios";
import { ProductContext } from "../context/ProductContext.js"

export function useProduct() {
    const { 
        productList, setProductList, pidItem, setPidItem, setCategory, setSubcategory, setDetailList, setRankList 
    } = useContext(ProductContext);

    /** 상품 데이터 전체 호출 **/
    const getProductList = async() => {
        const result = await axios.post("http://localhost:9000/product/all");
        setProductList(result.data);

        return result.data;
    }

    /** 메인 - 아우터로~, 랭킹 리스트 필터링 */
    // 상품 데이터 필터링 등 작업이 필요할 때는 최대한 상품 전체 데이터를 호출하는 커스텀 훅에서 작업을 마친 후 반환해주는 것이 효율적
    const getFilterProducts = async(category, subCategory) => {
        const list = await getProductList();

        let categoryList = [];
        let subCategoryList = [];

        if (list) {
            // 아우터로~ 섹션 카테고리 데이터
            const filterCategory = list.filter(list => list.category === category);
            categoryList = filterCategory.filter((item, i) => i < 6 && item);
            setDetailList(categoryList);
            
            // 랭킹 카테고리 데이터
            const filterSubCategory = list.filter(list => list.category === subCategory);
            subCategoryList = filterSubCategory.filter((item, i) => i < 8 && item);
            setRankList(subCategoryList);
        }
        return { "categoryList": categoryList, "subCategoryList": subCategoryList };
    }

    /** 상품 아이디 별 데이터 호출 **/
    const getPidItem = async(pid) => {
        const result = await axios.post("http://localhost:9000/product/item", {"pid": pid});
        
        setPidItem(result.data);
    }

    return { getProductList, getPidItem, getFilterProducts };
}