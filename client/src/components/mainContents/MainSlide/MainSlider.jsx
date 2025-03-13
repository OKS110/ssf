import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { PrevArrow, NextArrow } from './Arrows.jsx'
import '../../../slider/slick.css';
import '../../../slider/slick-theme.css';

export default function MainSlider() {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        axios.get("/data/main.json")
            .then(res => setDataList(res.data.mainTopSlide))
            .catch(err => console.log(err));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <>
        <Slider {...settings}>
            { dataList && dataList.map((array) => 
                <div className='mainSlider-wrap'>
                    <ul className='mainSlider-list'>
                        { array.items.map((list) => 
                            <li>
                                <a href="/">
                                    <img src={list.img} alt="" className='mainSlider-img' />
                                    <div className="mainSlider-info">
                                        <div>
                                            <p className="mainSlider-info-brand-tit">{list.name}</p>
                                            <p className="mainSlider-info-brand-name">
                                                { list.tit.split("\n").map((tit) => 
                                                <p>{tit}</p>
                                                ) }
                                            </p>
                                            <p className="mainSlider-info-brand-desc">
                                                { list.desc.split("\n").map((desc) => 
                                                <p>{desc}</p>
                                                ) }
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ) }
                    </ul>
                </div>
            ) }
        </Slider>
        
        </>
    );
}