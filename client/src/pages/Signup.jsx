import {  useState } from "react";
import {signupValidate,handleIdCheck,handlePasswordCheck} from '../utils/validate.js';
import React from 'react';
import {initDatas,useRefDatas} from '../utils/initDatas.js';
import axios from "axios";
import {useNavigate} from 'react-router-dom';


export default function Signup(){
    const navigate = useNavigate();

    const {names,placeholder,labelsKr, formData} = initDatas();
    const {refs,msgRefs} = useRefDatas(names);  
    const [data, setData] = useState(formData);      
    const [error, setError] = useState(formData);
    const[idCheckResult,setIdCheckResult] = useState('default');  

    const [isChecked1, setIsChecked1] = useState(false); //체크박스 상태 관리
    const [isChecked2, setIsChecked2] = useState(false); //체크박스 상태 관리

    const handleChecked1 = (e) => {setIsChecked1(e.target.checked);}
    const handleChecked2 = (e) => {setIsChecked2(e.target.checked);}    

    const handleSignupForm = (e) => {
        const {name, value} = e.target;       
        setData({...data, [name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(signupValidate(refs,msgRefs,isChecked1,isChecked2)){  
            if(idCheckResult==='default'){
                alert('아이디 중복체크를 진행해주세요');
                return false;
            } else {
                axios
                    .post('http://localhost:9000/user/signup',data)
                    .then(res =>{
                        console.log(res.data);
                        if(res.data.result === 1 ){
                            alert('회원가입성공'); 
                            navigate('/login');
                        }
                    })
                    .catch(error => console.log(error));

            }   
        } 
    }
    console.log('회원가입data',data);
    
    return (
        <>
        <div className="signupBox">
            <section className="signup-wrap">
                <h1>회원가입</h1> 
                <form action="" onSubmit={handleSubmit}>
                <ul>
                    {names && names.map((name)=>(
                    <li className="signup-top ">
                            <label htmlFor="">{labelsKr[name]}</label>
                                { name === 'email' ? (
                                    <>
                                        <input type="text"  
                                            onChange={handleSignupForm} 
                                            name={name}
                                            ref={refs.current[name.concat('Ref')]} 
                                            placeholder={placeholder[name]}/>
                                        <span className="emailEmt">@</span>
                                        <select name="emailDomain" id="" onChange={handleSignupForm}
                                            ref={refs.current['emailDomainRef']} className="select-err">
                                            <option value="default">선택</option>
                                            <option value="naver.com">naver.com</option>
                                            <option value="gmail.com">gmail.com</option>
                                            <option value="daum.net">daum.net</option>
                                        </select>
                                    </>
                                    ):(
                                    name === 'id' ? (
                                        <>
                                        <div className="dupliBox">
                                            <input type="text"  
                                                onChange={handleSignupForm} 
                                                name= {name}
                                                ref= {refs.current[name.concat('Ref')]}  
                                                className="dupliInput"
                                                placeholder={placeholder[name]}/>
                                            <button type='button'  
                                                className="dupliId"
                                                ref ={refs.idCheckRef} 
                                                onClick={()=>{handleIdCheck(
                                                    refs.current['idRef'],
                                                    msgRefs.current['idMsgRef'],
                                                    refs.current['pwdRef'],
                                                    setIdCheckResult,
                                                    setError,error
                                                )}}>
                                                중복확인
                                            </button>
                                            <input type="hidden" 
                                              value={idCheckResult} />
                                        </div>
                                        </>
                                        ) : (
                                        <input type={(name==='pwd' || name==='cpwd') ? 'password': 
                                            (
                                                (name === 'phone') ? 'tel' : 'text'
                                            )} 
                                            onChange={handleSignupForm} 
                                            name= {name}
                                            ref= {refs.current[name.concat('Ref')]} 
                                            placeholder={placeholder[name]}
                                            onBlur={
                                                (name==='cpwd') ? ()=>{handlePasswordCheck(
                                                    refs.current['pwdRef'],
                                                    refs.current['cpwdRef'],
                                                    refs.current['usernameRef'],
                                                    msgRefs.current['pwdMsgRef'],
                                                    msgRefs.current['cpwdMsgRef']
                                                )} : null 
                                            }/>
                                        )
                                    )
                                }
                            <span className="signup-err" 
                                ref={msgRefs.current[name.concat('MsgRef')]}>
                                    {idCheckResult === 'default' ? placeholder[name] : (
                                        name === 'id' ? error.id : placeholder[name]
                                    )}
                                    </span>           


                        </li>
                    ))}                  
                    <li className="signup-top">
                        <label htmlFor="">이용약관</label>
                        <div className="textarea">
                        ssf 이용약관<br />
                        제1조(목적) <br />
                        이 약관은 주식회사 브이에프 코리아 (전자상거래 사업자, 이하 "회사"라고 합니다)가 운영하는 팀버랜드 브랜드 – 사이버스토어 (이하 "스토어"라고 합니다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라고 합니다)를 이용함에 있어 "스토어"와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                        ※ PC통신, 모바일, 무선, VoIP, IPTV, 데이터방송 등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.
                        </div>
                    </li>
                    <li className="signup-bottom">
                        <input type="checkbox" className="checkInput" name="checkBox1" 
                            checked={isChecked1} onChange={handleChecked1}/>
                        <span>(필수) 이용약관에 동의 합니다.</span>
                    </li>
                    <li className="signup-bottom">
                        <label htmlFor="">개인정보수집 이용동의</label>     
                    <table>
                        <tr>
                            <th>일시</th>
                            <th>수집항목</th>
                            <th>수집목적</th>
                            <th>보유기간</th>
                        </tr>
                        <tr>
                            <td>가입시</td>
                            <td>아이디(이메일), 비밀번호, 이름, 전화번호</td>
                            <td>회원식별 및 연락</td>
                            <td>회원 탈퇴시 까지</td>
                        </tr>
                        <tr>
                            <td>거리발생시 (추가)</td>
                            <td>주소, 결제수단정보, 수령인, 연락처</td>
                            <td>결제 및 배송, 불만 처리시 본인확인</td>
                            <td>전상법 등 관련 법률에 의한 보관기간</td>
                        </tr>
                    </table>
                    </li>
                    <li className="signup-bottom">
                        <input type="checkbox" name="checkBox2" className="checkInput"
                            checked={isChecked2} onChange={handleChecked2}/>
                        <span> (필수) 개인정보수집 이용에 동의합니다.</span>
                        <p>※ 약관 및 개인정보 처리방침은 홈페이지 하단에 전문이 게재되어 있습니다.</p>
                        <p>※ 이용약관 및 개인정보 수집.이용 내용에 대해 동의 거부가 가능하며, 이 경우 회원가입 및 관련 서비스는 이용이 불가합니다.</p>
                    </li>
                    <li className="signup-bottom">
                        <input type="checkbox" className="checkInput"/>
                        <span> (선택) 이메일을 통한 상품 및 이벤트 정보 수신에 동의합니다.</span>
                    </li>
                    <li className="signup-bottom">
                        <input type="checkbox"  className="checkInput" />
                        <span> (선택) 휴대폰을 통한 상품 및 이벤트 정보 수신에 동의 합니다. 미동의 시에도 주문 결제와 관련된 정보는 발송됩니다.</span>
                    </li>
                    <li className="signup-bottom">
                        <p>※ 선택 항목으로 동의하지 않아도 불이익을 받지 않습니다.</p>
                        <p>※ 만 14세 미만은 회원가입 및 서비스 이용이 불가합니다.</p>
                    </li>
                </ul>
                <button type="submit">회원가입하기</button>
                </form>
            </section>
        </div>
        </>
    );
}



