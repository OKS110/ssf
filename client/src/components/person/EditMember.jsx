import React from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import EditMyInfo from './orderCancle/EditMyInfo';
import PersonUIform from './PersonUIform.jsx';

export default function EditMember() {
    // const category = {
    //     'myinfo':myinfo
    // };
    // 이거 카테고리 눌러서 넘어가는거 쇼피에 잇자나 그거 참고행


    return (
        <div className="mypage-box">
        <div className="mypage-top-menu">
            <span>Home</span>
            <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person'className='mypage-link' >마이페이지</Link></span>
        </div>
        <div className="mypage-top-box-flex">
            <div className="mypage-top-box-empty"></div>
            <div  className="mypage-top-box  mypage-Title">회원정보 관리</div>
        </div>
        <div className="mypage-bottom-box">
        <PersonUIform />
            <article className="mypage-bottom-right">
                <div className='mypage-user-info'>
                    <ul>
                        <li>내정보 관리</li>
                        <li className='mypage-user-info-tab' >
                            <span>회원정보 수정</span><span><SlArrowRight /></span>
                            </li>
                        <li className='mypage-user-info-tab'>
                            <span>사이즈 관리</span><span><SlArrowRight /></span>
                            </li>
                        <li className='mypage-user-info-tab'>
                            <span>환불계좌 관리</span><span><SlArrowRight /></span>
                            </li>
                        <li className='mypage-user-info-tab'>
                            <span>마케팅정보 수신 동의</span><span><SlArrowRight /></span>
                            </li>
                        <li className='mypage-user-info-tab'>
                            <span>배송지 관리</span><span><SlArrowRight /></span>
                            </li>
                    </ul>
                </div>                
            {/* 해당하는탭클릭하면 그 컴포넌트로이동하게 만들어 온클릭해서  */}
                <EditMyInfo />
            </article>
        </div>
    </div>
    );
}

