import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductBlock from '../commons/ProductBlock';
import { FaStar, FaHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Image from '../commons/Image.jsx';
import Button from '../commons/Button.jsx';


export default function SectionWrap({id, title, children}) {
    const [category, setCategory] = useState("상의"); // 아우터로~ 탭 메뉴 관리
    const [subCategory, setSubCategory] = useState("하의"); // 랭킹 탭 메뉴 관리
    const [products, setProducts] = useState([]); // category tab 전체 상품 데이터
    const [detailList, setDetailList] = useState([]); // 필터링을 거친 상품 데이터(대분류용)
    const [rankList, setRankList] = useState([]); // 필터링을 거친 상품 데이터(중분류용)

    const tabList = [
        { tabName: "상의" },
        { tabName: "하의" },
        { tabName: "아우터" },
        { tabName: "신발" }
    ];
    
    useEffect(() => {
        axios.post("http://localhost:9000/product/category")
                .then(res => {
                    setProducts(res.data);

                    const filterCategory = products.filter(list => list.category === category);
                    const categoryList = filterCategory.filter((item, i) => i < 6 && item);

                    setDetailList(categoryList);
                })
                .catch(err => console.log(err));
    }, [category, detailList]);

    useEffect(() => {
        axios.post("http://localhost:9000/product/rank")
                .then(res => {
                    setProducts(res.data);

                    const filterSubCategory = products.filter(list => list.category === subCategory);
                    const subCategoryList = filterSubCategory.filter((item, i) => i < 8 && item);

                    setRankList(subCategoryList);
                })
                .catch(err => console.log(err));
    }, [subCategory, rankList]);

    return (
        <section id={id} style={{backgroundColor:"green"}}>
            <h2>{title}</h2>
            {/* {id === 'skill' && <p class="description">Skills & Attributes</p>} */}
            {id === "event" && 
                <ul class="ssf-events">
                <li>
                            <a href="/event/EV202411010144826/view?utag=ref_tpl:111942$ref_cnr:23369$set:2$dpos:1" onclick="cnrClickLoging('23369','2','1','/event/EV202411010144826/view');">
                                <div class="item-img">
                                    <img src="https://img.ssfshop.com/display/category/THM/A30/A16/contents/23369_345896_34_KOR_20250131115729.png" alt="2월 웰컴딜" class="swiper-lazy swiper-lazy-loaded"/>
                                </div>
                                <div class="item-info">
                                    <p class="tit">아직 구매한 적 없으시다면</p>
                                    <p class="desc">첫 구매 최대 90% 할인 받아가세요</p>
                                </div>
                            </a>
                        </li>
                    <li>
                            <a href="/event/EV202501160146633/view?utag=ref_tpl:111942$ref_cnr:23369$set:2$dpos:2" onclick="cnrClickLoging('23369','2','2','/event/EV202501160146633/view');">
                                <div class="item-img">
                                    <img src="https://img.ssfshop.com/display/category/THM/A30/A16/contents/23369_345896_32_KOR_20241227160250.jpg" alt="친구초대" class="swiper-lazy swiper-lazy-loaded"/>
                                </div>
                                <div class="item-info">
                                    <p class="tit">친구에게 SSF샵을 추천해주세요</p>
                                    <p class="desc">무제한 2천 코인을 챙겨드려요</p>
                                </div>
                            </a>
                        </li>
                    <li>
                            <a href="/event/EV202407240143309/view?utag=ref_tpl:111942$ref_cnr:23369$set:2$dpos:3" onclick="cnrClickLoging('23369','2','3','/event/EV202407240143309/view');">
                                <div class="item-img">
                                    <img src="https://img.ssfshop.com/display/category/THM/A30/A16/contents/23369_345896_3_KOR_20240306114543.jpg" alt="앱첫로그인" class="swiper-lazy swiper-lazy-loaded"/>
                                </div>
                                <div class="item-info">
                                    <p class="tit">앱에서 첫 로그인하고 쿠폰 받으세요</p>
                                    <p class="desc">1만원 쿠폰 즉시 지급</p>
                                </div>
                            </a>
                        </li>
                    </ul>
            }
            {id === 'outer' && 
            <div className='contents-box god-lists' >
                <ul className='category-select'>
                    { tabList && tabList.map((list) => 
                        <li className={list.tabName === category ? 'category-select-click-tabMenu' : 'category-select-tabMenu'}
                            onClick={() => setCategory(list.tabName)}>
                        {list.tabName}
                        </li>
                    ) }
                </ul>
                <ProductBlock detailList={detailList} ulClassName="category-tab" liClassName="category-tab-list" className="category-list" />
            </div>
            }
            { 
                id === 'rank' &&
                <div className='contents-box god-lists'>
                    <ul className='sub-category-select'>
                        { tabList && tabList.map((list) => 
                            <li className={list.tabName === subCategory ? 'sub-category-select-click-tabMenu' : 'sub-category-select-tabMenu'}
                                onClick={() => setSubCategory(list.tabName)}>
                            {list.tabName}
                            </li>
                        ) }
                    </ul>
                    <ProductBlock detailList={rankList} ulClassName="sub-category-tab" liClassName="sub-category-tab-list" className="sub-category-list" />
                    <button type='button' className='sub-category-btn'>랭킹 바로가기<IoIosArrowForward /></button>
                </div>
            }
            {children}
        </section>
    );
}
