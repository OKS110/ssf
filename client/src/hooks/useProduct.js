import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProductContext } from "../context/ProductContext.js"

export function useProduct() {
    const { 
        productList, setProductList, pidItem, setPidItem, setCategory, setSubcategory, setDetailList, setRankList, setSearchList
    } = useContext(ProductContext);
    const [socket, setSocket] = useState(null); // ✅ WebSocket 상태 관리

    /** 상품 데이터 전체 호출 **/
    const getProductList = async() => {
        const result = await axios.post("http://localhost:9000/product/all"); // 별점 순으로 order by 사용해서 출력
        setProductList(result.data);
        console.log("상품 데이터 전체 호출 : ", result.data);
        
        return result.data;
    }
    /** WebSocket을 이용해 상품 업데이트 감지 **/
    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:9002"); // ✅ WebSocket 연결
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log("📡 WebSocket 연결됨 (고객 → 관리자)");
        };

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "update_products") {
                console.log("🔄 상품 데이터 변경 감지! 목록 업데이트 중...");
                getProductList(); // ✅ WebSocket 메시지를 수신하면 즉시 최신 데이터 반영
            }
        };

        return () => {
            newSocket.close();
        }; // ✅ 언마운트 시 WebSocket 종료
    }, []);
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
            
            // 서브 카테고리 데이터
            const filterSubCategory = list.filter(list => list.sub_category === subCategory);
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

    /** 모달창 상품 검색 필터링 **/
    const getSearchList = async(search) => {
        const list = await getProductList();

        const filterData = list.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
        const filterData2 = list.filter((item) => item.category.toLowerCase().includes(search.toLowerCase()));

        if (filterData.length !== 0) {
            setSearchList(filterData);
        } else {
            setSearchList(filterData2);
        }

        return { "filterData": filterData };
    }

    return { getProductList, getPidItem, getFilterProducts, getSearchList };
}