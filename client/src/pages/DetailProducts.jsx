import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductMypage from "../commons/ProductMypage";
import DetailImage from "../components/DetailProducts/DetailImage";
import DetailOrder from "../components/DetailProducts/DetailOrder";
import DetailTop from "../components/DetailProducts/DetailTop";
import { useProduct } from '../hooks/useProduct.js';
import { ProductContext } from '../context/ProductContext.js';

export default function DetailProducts(){
    const { pidItem } = useContext(ProductContext);
    const { pid } = useParams();
    const { getPidItem } = useProduct();

    useEffect(() => {
        getPidItem(pid);
    }, []);
    console.log('pidItem --> ', pidItem);
    
    const tabsData = [
        { id: "goodsDetailTab", label: "상품정보", href: "#goodsDetailTabs" },
        { id: "sizeTab", label: "사이즈&핏", href: "#goodsDetailTabs"},
        { id: "reviewTab", label: "리뷰", href: "#goodsDetailTabs" },
        { id: "recommendTab", label: "추천", href: "#goodsDetailTabs"}
    ];
    
    return (
        <>
        <div className="detail-wrap content-wrap">
            <DetailTop></DetailTop>
                <div class="gods-summary" view-section="summary">
                    {/* <!-- 상품 이미지 --> */}
                    <DetailImage></DetailImage>

                    <DetailOrder></DetailOrder>
                </div>

                <ProductMypage tabs={tabsData} />
        </div>
        </>
    );
}