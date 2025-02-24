import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    // 전역 공간에서 자동 업데이트 되도록 관리
    const [productList, setProductList] = useState([]); 
    const [pidItem, setPidItem] = useState([]);

    return (
        <ProductContext.Provider value={{ productList, setProductList, pidItem, setPidItem }}>
            {children}
        </ProductContext.Provider>
    );
}