import { CiCircleQuestion } from "react-icons/ci";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DetailProductContext } from "../../context/DetailProductContext";
import { AuthContext } from "../../auth/AuthContext.js";
import { useCart } from "../../hooks/useCart.js";

export default function DetailOrder({pid, pidItem}){
    const { isLoggedIn } = useContext(AuthContext);

    const sizePidItemList = pidItem.size; // 상품의 사이즈 []
    const colorPidItemList = pidItem.color; // 상품의 색 []
    
    const {count, setCount, selectColor, setSelectColor, selectedSize, setSelectedSize, cartList, userId} = useContext(DetailProductContext);
    const { saveToCart, getCartItems, updateDetailQty } = useCart();

    // 아이디 번호 호출
    useEffect(() => {
        if (isLoggedIn) {
            // 카트 리스트 전체 호출
            getCartItems();
        }
    }, []);

    // 수량
    const handleCount = (e, type) => {
        e.preventDefault();
        
        if(type === "decrease" && count > 1){
            setCount(count - 1);
        }else if(type === "increase"){
            setCount(count + 1);
        }
        
    }

    // 색상 선택 핸들러
    const handleColorSelect = (index) => {
        setSelectColor(index); // 전역 상태 업데이트
    };

    // 사이즈 선택 핸들러
    const handleSizeSelect = (index) => {
        setSelectedSize(index);
    };

    // 수량 : 숫자, 색상&사이즈 : 배열 번지수로 체킹
    console.log("로그인 상태 --> ", isLoggedIn);

    // 장바구니 버튼 이벤트
    const addCart = () => {
        if (!isLoggedIn) { // 비회원 상태
            alert("비회원");
        } else { // 로그인 상태
            const findItem = cartList && cartList.find((item) => item.product_id === pidItem.pid); // 조건 수정 필요
            // console.log("findItem ==> ", findItem);

            if (findItem !== undefined) {
                console.log("장바구니에 동일 상품 존재");
                updateDetailQty(findItem.cid, "increase", count);
            } else {
                console.log("장바구니에 동일 상품 없음");
                const formData = {
                    id: userId,
                    pid: pid,
                    count: count,
                    color: selectColor,
                    size: selectedSize
                }; // db에 들어갈 상품 데이터
                console.log("formData --> ", formData);
                saveToCart(formData);
            }
        }
    }

    return (
        <div className="godsInfo-area">
                        <div class="tags">
                            <span>{pidItem.deliveryFee === "free" ? '무료배송':"유료배송 3000원"}</span>
                        </div>
                        <h2 class="brand-name">
                            <a href="/Clove/main?brandShopNo=BDMA19E27&amp;brndShopId=RTCLO&amp;dspCtgryNo=">{pidItem.brand}</a>
                        </h2>
                        <div class="gods-name" id="goodDtlTitle">{pidItem.title}</div>
                        <div class="price-info">
                            <span class="gods-price">
                                    <span class="cost">
                                        {/* <span class="wa_hidden">원가</span> */}
                                        <del>{pidItem.costprice}</del>
                                    </span>
                                    <span class="sale">
                                        {/* <span class="wa_hidden">할인율</span> */}
                                        <span class="discount">{pidItem.discount}%</span>
                                        {/* <span class="wa_hidden">판매가</span> */}
                                        <span class="price">{pidItem.saleprice}</span>
                                        <CiCircleQuestion />
                                    </span>
                            </span>
                            <button class="btn bk sm" type="button" onclick="openGodDwldPsbCpnListLayer(); return false;"
                                style={{"backgroundColor":"black"}}>
                                <span>쿠폰다운</span>
                            </button>
                        </div>
                        <div id="goodsInfoReviewDiv" class="review-info">
                            <span class="point"><i aria-label="rate"></i><span id="goodsInfoReviewScore">{pidItem.star}</span></span>
                            <a href="javascript:void(0);">리뷰<span>1</span>건</a>
                            <a href="#" class="styled-cnt" id="goodsInfoDiverCnt" data-is-load="false" style={{"display": "none"}}></a>
                            <span>|</span>
                            <span>d</span>
                            <a href="#">스타일<span>5</span>건</a>
                        </div>
                        <div className="goods-info-middle">
                            <ul>
                                <li>
                                    <span>카드혜택</span>
                                    <span>카드사별 혜택 안내</span>
                                    <a href="">자세히보기</a>
                                </li>
                                <li>
                                    <span>기프트포인트</span>
                                    <span>멤버십 고객 한정 최대 47,900원 할인(10%)</span>
                                    <a href="">자세히보기</a>
                                </li>
                                <li>
                                    <span>포인트 적립</span>
                                    <span>멤버십포인트 2,400P</span>
                                </li>
                                <li>
                                    <span>배송방법</span>
                                    <span>택배배송</span>
                                    <span><CiCircleQuestion /></span>
                                    <span>{pidItem.delivery_fee === "free" ? '무료배송':"유료배송 3000원"}</span>                                 
                                    <a href=""><span>배송방법 더보기</span><TfiArrowCircleDown /></a>   
                                </li>
                            </ul>
                        </div>
                        <div className="goods-info-bottom">
                            <div className="goods-info-bottom-color">
                                <span>색상</span>
                                <ul>
                                    {/* 색상은 json에 잇는 색상 가져와서 보여주기 나중에 수정 */}
                                    {colorPidItemList && colorPidItemList.map((item, index) =>
                                     <li key={index}
                                            style={{
                                                backgroundColor: item,
                                                border: selectColor === index ? "2px solid black" : "none",
                                            }}
                                            onClick={() => handleColorSelect(index)}>
                                                
                                            </li>)}
                                </ul>
                            </div>
                            <div className="goods-info-bottom-size">
                                <span>사이즈</span>
                                <ul>
                                    {sizePidItemList && sizePidItemList.map((item, index) => 
                                        <li key={index}
                                            style={{
                                                border: selectedSize === index ? "2px solid black" : "none",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleSizeSelect(index)}>
                                            {item.name}
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="goods-info-bottom-delivery">
                                <span>배송방법</span>
                                <ul>
                                    <li>
                                        <span>{pidItem.deliveryFee === "free" ? '무료배송':"유료배송"}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="goods-info-count-price">
                            <div className="goods-info-count">
                                <button onClick={(e) => handleCount(e, "decrease")}>-</button>
                                <button>{count}</button>
                                <button onClick={(e) => handleCount(e, "increase")}>+</button>
                            </div>
                            <div className="goods-info-price">
                                <span>{pidItem.saleprice}</span>
                                <span>원</span>
                            </div>
                        </div>
                        <div className="goods-info-btns">
                            <button onClick={addCart}>
                                <a href="#">장바구니</a>
                            </button>
                            
                            <button >
                                {/* <Link to={'/order'} pidItem={pidItem}>바로구매</Link> */}
                                {/* React does not recognize the pidItem prop on a DOM element.
                                    → pidItem을 Link 태그에 직접 전달하려고 해서 발생한 오류입니다.
                                    Link 컴포넌트는 react-router-dom에서 제공하는 라우팅 컴포넌트이며, DOM 요소가 아니기 때문에 props를 직접 전달할 수 없습니다. */}
                                <Link to={`/order/${pidItem.pid}`} >바로구매</Link>
                            </button>
                        </div>
                    </div>
    );
}