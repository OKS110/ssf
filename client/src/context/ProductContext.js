import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    // 전역 공간에서 자동 업데이트 되도록 관리
    const [productList, setProductList] = useState([]); 
    const [pidItem, setPidItem] = useState([]);
    const [category, setCategory] = useState("상의"); // 아우터로~ 탭 메뉴 관리
    const [subCategory, setSubCategory] = useState("하의"); // 랭킹 탭 메뉴 관리
    const [detailList, setDetailList] = useState([]); // 필터링을 거친 상품 데이터(대분류용)
    const [rankList, setRankList] = useState([]); // 필터링을 거친 상품 데이터(중분류용)

    return (
        <ProductContext.Provider value={{ productList, setProductList, 
                                            pidItem, setPidItem,
                                            category, setCategory,
                                            subCategory, setSubCategory,
                                            detailList, setDetailList,
                                            rankList, setRankList
                                            }}>
            {children}
        </ProductContext.Provider>
    );
}