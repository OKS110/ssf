import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Test() {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        axios.get("/data/main.json")
            .then(res => setDataList(res.data.mainTopSlide))
            .catch(err => console.log(err));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <Slider {...settings}>
            { dataList && dataList.map((array) => 
                <div className='test-wrap'>
                    <ul className='test-list'>
                        { array.items.map((list) => 
                            <li>
                                <a href="/">
                                    <img src={list.img} alt="" className='test-slide-img' />
                                    <div className="test-slide-info">
                                        <p className="brand-name">{list.name}</p>
                                        <p className="brand-tit">{list.tit}</p>
                                        <p className="brand-desc">{list.desc}</p>
                                    </div>
                                </a>
                            </li>
                        ) }
                    </ul>
                </div>
            ) }
        </Slider>
    );
}