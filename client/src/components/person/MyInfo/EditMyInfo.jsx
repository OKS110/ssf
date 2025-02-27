import React,{useState, useEffect, useRef} from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import PersonUIform from '../PersonUIform.jsx';
import axios from 'axios';

export default function EditMyInfo() {
    const [data, setData ] = useState([]);
    const [pw, setPw] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const id = localStorage.getItem('user_id');
        axios.post('http://localhost:9000/mypage/myinfo',{'id':id})
            .then(res => 
            setData(res.data)
            )
            .catch(error => console.log(error)
            );
    },[]);

    // console.log(data);
    
    const handlePwd = (e) => {
        // console.log(e.target.value);
        setPw(e.target.value);
    }
    const checkPwd = () => {
        if(data.password === pw){
            navigate('/person/editMemberInfo/updateInfo');
        } else {
            alert('비밀번호가 일치하지 않습니다');
        }
    }

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
                        <input type="password" onChange={handlePwd} 
                            placeholder='비밀번호를 입력해주세요'/>
                    </div>
                    <div className='mypage-myinfo-pwdCheckBtn'>
                        <button onClick={checkPwd}>확인</button>
                    </div>
            </article>
        </div>
    </div>
    );
}

