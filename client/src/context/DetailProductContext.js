import { createContext, useState, useEffect } from 'react';

export const DetailProductContext = createContext();

export const DetailProductProvider = ({ children }) => {
    const [count, setCount] = useState(() => {
        return Number(sessionStorage.getItem("selectedCount")) || 1; // sessionStorage에서 불러오기
    });

    const [selectColor, setSelectColor] = useState(() => {
        return Number(sessionStorage.getItem("selectedColor")) || 0; // sessionStorage에서 불러오기
    });

    const [selectedSize, setSelectedSize] = useState(() => {
        return Number(sessionStorage.getItem("selectedSize")) || 0; // sessionStorage에서 불러오기
    });

    // 값이 변경될 때 sessionStorage에 저장
    useEffect(() => {
        sessionStorage.setItem("selectedCount", count);
    }, [count]);

    useEffect(() => {
        sessionStorage.setItem("selectedColor", selectColor);
    }, [selectColor]);

    useEffect(() => {
        sessionStorage.setItem("selectedSize", selectedSize);
    }, [selectedSize]);

    return (
        <DetailProductContext.Provider value={{ count, setCount, selectColor, setSelectColor, selectedSize, setSelectedSize }}>
            {children}
        </DetailProductContext.Provider>
    );
};
