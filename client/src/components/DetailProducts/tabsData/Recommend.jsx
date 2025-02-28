import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import { ProductContext } from '../../../context/ProductContext';


export default function Recommend(){
    const { getPidItem } = useProduct();
    const { pid} = useParams();
    const { pidItem, productList } = useContext(ProductContext);

    // 상품 데이터 가져오기 (pid 변경 시마다 실행)
    useEffect(() => {
        getPidItem(pid);
    }, []);

    return (
        <div style={{backgroundColor:"lightblue", height:"2000px"}}>
            추천
        </div>
    );
}