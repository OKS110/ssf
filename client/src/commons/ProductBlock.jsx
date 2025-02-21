import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaHeart } from "react-icons/fa";
import Image from './Image.jsx';

export default function ProductBlock({detailList, ulClassName, liClassName, className}) {
    const name = className.substring(0, 12);

    return (
        <ul className={ulClassName}>
            { detailList && detailList.map((item, i) => 
                <li className={liClassName}>
                    <div className={`${className}-img`}>
                        {name === "sub-category" && <p>{i+1}</p>}
                        <Image img={item.img} alt={item.alt} className='' />
                    </div>
                    <div className={`${className}-info`}>
                        <p className={`${className}-brand`}>{item.brand && item.brand}</p>
                        <p className={`${className}-title`}>{item.title}</p>
                        <p className={`${className}-price-wrap`}>
                            <p className={`${className}-costprice`}>{item.costprice}</p>
                            <p className={`${className}-price-container`}>
                                <span>{item.discount}%</span><span>{item.saleprice}</span>
                            </p>
                        </p>

                        <p className={`${className}-star-likes-container`}>
                            <span className={`${className}-star-wrap`}>
                                <span><FaStar /></span>
                                <span>{item.star}</span>
                                <span>({item.reviewCount})</span>
                            </span>
                            <span className={`${className}-likes-wrap`}>
                                <span><FaHeart /></span>
                                <span>{item.likes}</span>
                            </span>
                        </p>
                    </div>
                </li>
            ) }
        </ul>
    );
}

/**
 * 호출 시 npm react-icons 설치 필수
 * 단독으로 쓰이지 않는 것 같아 처음부터 리스트로 컴포넌트 생성. 필요시 분리
 * 호출하는 곳에서 detailList, ulClassName, liClassName, className 지정하여 구조분해할당으로 받을 것
 *  className : 세부 태그들 클래스명 지정 위해 사용
 * 데이터 수정 필요
**/