import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    // 전역 공간에서 자동 업데이트 되도록 관리
    const [productList, setProductList] = useState([]); 
    const [pidItem, setPidItem] = useState([]);
    const [pidItem2, setPidItem2] = useState([]);
    const [category, setCategory] = useState("상의"); // 아우터로~ 탭 메뉴 관리
    const [subCategory, setSubCategory] = useState("코트"); // 랭킹 탭 메뉴 관리
    const [detailList, setDetailList] = useState([]); // 필터링을 거친 상품 데이터(대분류용)
    const [rankList, setRankList] = useState([]); // 필터링을 거친 상품 데이터(중분류용)
    const [search, setSearch] = useState(""); // 검색창 검색어 관리
    const [searchList, setSearchList] = useState([]); // 검색 필터링 아이템

    return (
        <ProductContext.Provider value={{ productList, setProductList, 
                                            pidItem, setPidItem,
                                            category, setCategory,
                                            subCategory, setSubCategory,
                                            detailList, setDetailList,
                                            rankList, setRankList,
                                            searchList, setSearchList,
                                            search, setSearch,
                                            pidItem2, setPidItem2
                                            }}>
            {children}
        </ProductContext.Provider>
    );
}