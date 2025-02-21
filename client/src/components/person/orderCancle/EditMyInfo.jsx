import React from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import PersonUIform from '../PersonUIform.jsx';

export default function EditMyInfo() {
    return (
        <div className="mypage-box">
        <div className="mypage-top-menu">
            <span>Home</span>
            <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person'className='mypage-link' >마이페이지</Link></span>
        </div>
        <div className="mypage-top-box-flex">
            <div className="mypage-top-box-empty"></div>
            <div  className="mypage-top-box  mypage-Title">비밀번호 확인</div>
        </div>
        <div className="mypage-bottom-box">
            <PersonUIform />
            <article className="mypage-bottom-right">                      
                    여기에 만들엉
            </article>
        </div>
    </div>
    );
}

