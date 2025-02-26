import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SlideWrapTest(){
    const [ testList, setTestList ] = useState([]);

    useEffect(() => {
        axios.get("/data/test.json")
            .then(res => setTestList(res.data.mainTopSlide))
            .catch(error => console.log(error));
    }, []);

    // console.log("testList --> ", testList);

    return (
        <>
        { testList && testList.map((array) => 
            <div className="swiper-slide"
                    style={{"width": "100%"}}>
                        <div className="slide-lists">
                {array.items.map((item) => 
                    <div className="slide-item">
                        <a href="javascript:undefined;" onclick="cnrClickLoging('23357','세트10(28~30)','151','/special/101010/view');javascript:location.href='/special/101010/view?utag=ref_tpl:111942$ref_cnr:23357$set:1$dpos:1';">
                            <div className="brand-info-area">
                                <p className="brand-name">{item.name}</p>
                                <p className="brand-tit">{item.tit}</p>
                                <p className="brand-desc">{item.desc}</p>
                            </div>
                            <img 
                                className="swiper-lazy swiper-lazy-loaded" 
                                src={item.img}
                                alt="" 
                            />
                        </a>
                    </div>
                )}
                </div>
            </div> 
        ) }

        </>
    );
}