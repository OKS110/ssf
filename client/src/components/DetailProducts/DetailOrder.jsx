import { CiCircleQuestion } from "react-icons/ci";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function DetailOrder({pidItem}){
    const sizePidItemList = pidItem.size; // 상품의 사이즈 []
    const colorPidItemList = pidItem.color; // 상품의 색 []
    console.log("size", sizePidItemList);
    console.log("color", colorPidItemList);
    
    

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
                                    {colorPidItemList && colorPidItemList.map((item, index) => <li key = {index} style={{'backgroundColor':`${item}`}}></li>)}
                                </ul>
                            </div>
                            <div className="goods-info-bottom-size">
                                <span>사이즈</span>
                                <ul>
                                    {sizePidItemList && sizePidItemList.map((item, index) => 
                                        <li htmlFor="" key={index}>
                                            {item}
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
                                <button>-</button>
                                <button>1</button>
                                <button>+</button>
                            </div>
                            <div className="goods-info-price">
                                <span>479,000</span>
                                <span>원</span>
                            </div>
                        </div>
                        <div className="goods-info-btns">
                            <button>
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