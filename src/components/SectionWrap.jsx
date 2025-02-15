import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductBlock from '../commons/ProductBlock';


export default function SectionWrap({id, title, children}) {
    const [detailList, setDetailList] = useState([]);
    // const [ulClassName, setUlClassName] = useState("");
    // const [liClassName, setLiClassName] = useState("");
    useEffect(() => {
        axios.get("http://localhost:9000/products")
        .then(res => {  
            setDetailList(res.data);
        })
        .catch(error => console.log(error));
        
    }, [])
    console.log("detailList", detailList);
    

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
                <ul>
                    <li>
                        <ProductBlock
                             detailList={detailList}
                             ulClassName="list-col-6"
                             liClassName="god-item"/>
                    </li>
                </ul>
            </div>
            }
            {children}
        </section>
    );
}

