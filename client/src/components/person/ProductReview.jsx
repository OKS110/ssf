import React, { useState } from 'react';
import PersonUIform from './PersonUIform.jsx';
import {Link} from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";
import ProductMypage from '../../commons/ProductMypage.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import ReviewResite from './Review/ReviewResite.jsx';
import ReviewCheck from './Review/ReviewCheck.jsx';

export default function ProductReview() {
    const tabsData = [
        { id: "mypageReviewEdit", label: "리뷰 작성하기", href: "#mypageReviewEdit" , content:<ReviewResite />},
        { id: "mypageReviewCheck", label: "작성한 리뷰", href: "#mypageReviewCheck", content:<ReviewCheck /> },
         
    ];
    
    // 부모에서 활성화된 탭 상태를 관리
    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

    // 현재 활성화된 탭의 콘텐츠 찾기
    const renderContent = () => {
        const activeContent = tabsData.find(tab => tab.id === activeTab);
        return activeContent ? activeContent.content : null;
    };

   const [open,setOpen] = useState(true);
   const handleDesc = (name) => {
    setOpen(name);
}
    return (
        <div className="mypage-box">
        <div className="mypage-top-menu">
            <span>Home</span>
            <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person' className='mypage-link' >마이페이지</Link></span>
        </div>
        <div className="mypage-top-box-flex">
            <div className="mypage-top-box-empty"></div>
            <div  className="mypage-top-box   mypage-Title-notborder" >상품리뷰</div>
        </div>
        <div className="mypage-bottom-box">
                <PersonUIform />
            <article className="mypage-bottom-right">
               <ProductMypage 
                    tabs={tabsData} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                />
                <div style={{ border: "1px solid red" , marginTop:'30px'}}>
                    {renderContent()}
                </div>
                             
                <div className='mypage-review-desc'>
                    <div className='mypage-review-desc-tab'>
                        <span>상품리뷰 안내</span>
                        {open !== true ? <span onClick={()=>{handleDesc(true)}}> <SlArrowDown /> </span> :
                                    <span onClick={()=>{handleDesc(false)}}> <SlArrowUp /></span>}  
                    </div>
                    {open &&
                        <div className='mypage-review-table-box'>
                            <table className='mypage-review-table'>
                                <tr>
                                    <th>작성조건</th>
                                    <td>
                                        <li>SSF SHOP, 삼성물산 패션부문 오프라인 매장(SSF SHOP에서 판매중이며 구매 시 멤버십 포인트를 적립한 상품)에서 구매한 상품에 대해 리뷰 작성이 가능합니다.</li>
                                        <li>상품 수령 완료일로부터 45일 이내 작성 가능합니다.</li>
                                    </td>
                                </tr>
                                <tr>
                                    <th>혜택</th>
                                    <td>
                                        <li>텍스트리뷰 20자 이상 200C, 50자 이상 500C, 사진 등록 시 추가 500C</li>
                                        <table>
                                            <tr>
                                                <th>혜택 기준</th>
                                                <th>혜택 내용</th>
                                            </tr>
                                            <tr>
                                                <td>텍스트 20자 이상(+사진 첨부)</td>
                                                <td>200C(+500C)</td>
                                            </tr>
                                            <tr>
                                                <td>텍스트 50자 이상(+사진 첨부)</td>
                                                <td>500C(+500C)</td>
                                            </tr>
                                            <tr>
                                                <td>베스트 리뷰 선정</td>
                                                <td>3,000C</td>
                                            </tr>
                                            <tr>
                                                <td>도움돼요 5명이상(체험단리뷰, 직원리뷰 제외)</td>
                                                <td>500C</td>
                                            </tr>
                                        </table>
                                        <li>실 결제(상품할인, 쿠폰적용) 단품금액이 5,000원 이상인 상품에 한해 리뷰작성 퍼블코인을 지급합니다.</li>
                                        <li>리뷰로 지급된 퍼플코인의 유효기간은 180일입니다.</li>
                                        <li>텍스트 리뷰 작성 후 사진을 추가 첨부한 경우 사진첨부 혜택을 추가 지급합니다.</li>
                                        <li>동일 상품의 리뷰작성 혜택은 30일 이내1회로 제한됩니다.</li>
                                        <li>의료기기 및 건강기능식품의 경우 리뷰 항목 중 만족도 평가만 작성가능하며, 리뷰작성 혜택이 제공되지 않습니다.</li>
                                    </td>
                                </tr>
                                <tr>
                                    <th>노출 제한 및 혜택 회수</th>
                                    <td>
                                        <li>노출 제한 사유에 해당하는 리뷰는 사전 동의 없이 미노출 될 수 있으며 지급된 퍼플코인은 회수합니다.</li>
                                        <li>※ 노출 제한 사유</li>
                                        <li>-직접 촬영하지 않은 사진인 경우</li>
                                        <li>-상품과 관련 없는 내용 또는 해석 불가능한 경우</li>
                                        <li>-비속어, 허위사실 등이 포함된 경우</li>
                                        <li>-이외 SSF SHOP 약관 및 기타 관련 법률에 위배되는 경우</li>
                                    </td>
                                </tr>
                                <tr>
                                    <th>신고</th>
                                    <td>
                                        <li>3회 이상 신고된 리뷰는 사전 동의 없이 미노출 될 수 있습니다.</li>
                                    </td>
                                </tr>
                                <tr>
                                    <th>활용</th>
                                    <td>
                                        <li>작성된 리뷰는 홍보, 이벤트 등 다양한 방법으로 활용될 수 있습니다.</li>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    }
                </div>
            </article>
        </div>
    </div>
    );
}

