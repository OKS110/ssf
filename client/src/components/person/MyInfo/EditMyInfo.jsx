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
                    <h5 className='mypage-myinfo-pwdCheck'>개인정보보호를 위해 비밀번호를 입력해 주세요.</h5>
                    <div className='mypage-myinfo-pwdCheck-box'>
                        <label htmlFor="">비밀번호</label>                        
                        <input type="password" 
                            placeholder='비밀번호를 입력해주세요'/>
                    </div>
                    <div className='mypage-myinfo-pwdCheckBtn'>
                        <Link to='/person/editMemberInfo/updateInfo'><button>확인</button></Link>
                    </div>
            </article>
        </div>
    </div>
    );
}

