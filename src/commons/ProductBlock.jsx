import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { FaStar, FaHeart } from "react-icons/fa";
import Image from './Image.jsx';

export default function ProductBlock({detailList, ulClassName, liClassName}) {
    return (
        <ul className={ulClassName}>
            { detailList && detailList.map((item) => 
                <li className={liClassName}>
                    <div>
                        <Image img={item.image[0]} alt={item.alt} className='' />
                    </div>
                    <div>
                        <p>{item.sub_category}</p>
                        <p>{item.name}</p>
                        <p>{item.original_price}</p>
                        <p><span>{item.discount_rate}%</span><span>{item.discounted_price}</span></p>
                        <p>
                            <span>
                                <span><FaStar /></span>
                                <span>{item.star}</span>
                            </span>
                            <span>
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
 * 호출하는 곳에서 detailList, ulClassName, liClassName 지정하여 구조분해할당으로 받을 것
 * 데이터 수정 필요
**/