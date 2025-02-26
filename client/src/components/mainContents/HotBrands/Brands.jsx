import { useEffect, useState } from "react";
import axios from "axios";

export default function Brands2(){
    const [ brandList, setBrandList ] = useState([]);

    useEffect(() => {
        axios.get("/data/test.json")
            .then(res => setBrandList(res.data.mainHotBrand))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
        { brandList && brandList.map((array) => 
            <div className="swiper-slide swiper-slide-active" role="group" aria-label="1 / 3" style={{"width": "1400px"}}>
                <div className="brand-lists">
                    <ul>
                        { array.items.map((item) => 
                            <li>
                                <a href="/BEANPOLE/main?dspCtgryNo=&amp;brandShopNo=BDMA01&amp;brndShopId=BPBR&amp;utag=ref_tpl:111942$ref_cnr:23368$set:1$dpos:1" onclick="cnrClickLoging('23368','1','1','/BEANPOLE/main?dspCtgryNo=&amp;brandShopNo=BDMA01&amp;brndShopId=BPBR');">
                                    <div className="brand-box">
                                        <img className="swiper-lazy swiper-lazy-loaded" src={item.img}/>
                                    </div>
                                    <span className="tit">{item.tit}</span>
                                </a>
                            </li>
                        ) }
                    </ul>
                </div>
            </div>
        ) }
        </>
    );
}