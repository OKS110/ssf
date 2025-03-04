import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import { ProductContext } from '../../../context/ProductContext';
import ProductBlock from '../../../commons/ProductBlock';


export default function Recommend(){
    const { getPidItem } = useProduct();
    const { pid} = useParams();
    const { productList, detailList, rankList, category, subCategory, setCategory, setSubCategory } = useContext(ProductContext); // 전역 관리
    const { getFilterProducts } = useProduct(); // custom hooks

    useEffect(() => {
        // 필터링 완료된 상품 데이터 호출
        const result = getFilterProducts(category, subCategory);
    }, [category, subCategory]);

    // 상품 데이터 가져오기 (pid 변경 시마다 실행)
    useEffect(() => {
        getPidItem(pid);
    }, []);

    return (
        <div style={{backgroundColor:"lightblue", height:"auto"}}>
            <div><h1>비슷한 상품</h1></div>
            <ProductBlock detailList={detailList} ulClassName="category-tab" liClassName="category-tab-list" className="category-list" />
            
            <div><h1>이 상품과 많이 본 상품</h1></div>
            <ProductBlock detailList={detailList} ulClassName="category-tab" liClassName="category-tab-list" className="category-list" />
        </div>
    );
}