import React,{useState} from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import PersonUIform from '../PersonUIform.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export default function UpdateInfo() {
       const [open,setOpen] = useState(false);
       const handleDesc = (name) => {
        setOpen(name);
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
                    <div  className="mypage-top-box  mypage-Title">회원정보 수정</div>
                </div>
                <div className="mypage-bottom-box">
                    <PersonUIform />
                    <article className="mypage-bottom-right">                      
                        <div className='mypage-myinfo-update-box'>
                            <h5>기본정보</h5>
                            <ul>
                                <li>
                                    <label htmlFor="">아이디</label>
                                    <input type="readonly" 
                                        value='tesettest'/>
                                    <button>변경</button>
                                </li>
                                <li>
                                    <label htmlFor="">비밀번호</label>
                                    <input type="readonly" 
                                        value='......'/>
                                    <button>변경</button>
                                </li>
                                <li>
                                    <label htmlFor="">이름</label>
                                    <input type="readonly"
                                        value='홍길동' />
                                    <button>변경</button>
                                </li>
                                <li>
                                    <label htmlFor="">휴대폰번호</label>
                                    <input type="readonly" 
                                        value='01022223333'/>
                                    <button>변경</button>
                                </li>
                                <li>
                                    <label htmlFor="">이메일</label>
                                    <input type="text" />
                                    <button>변경</button>
                                </li>
                                <li>
                                    <label htmlFor="">주소</label>
                                    <input type="text" />
                                    <button>주소찾기</button>
                                </li>
                            </ul>
                            <div className='mypage-myinfo-update-check1'>
                                <input type="checkbox" /><span>기본배송지 지정</span>
                            </div>
                            <div className='mypage-myinfo-update-check2'>
                                <div>
                                    <input type="checkbox" />
                                    <span>주소정보 수집 및 이용 동의</span>
                                </div>
                                <div>
                                    <span>약관보기</span>
                                    {open !== true ? <span onClick={()=>{handleDesc(true)}}> <SlArrowDown /> </span> :
                                         <span onClick={()=>{handleDesc(false)}}> <SlArrowUp /></span>}  
                                </div>
                            </div>
                        {open &&
                            <div className='mypage-myinfo-update-desc'>
                                <ul>
                                    <li>
                                        <h4>1. 회원 주문시 개인정보 수집 및 이용</h4>
                                        <h5>회사는 주문 및 배송서비스의 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</h5>
                                    </li>
                                    <li>
                                        <h4>2. 회원 고객 개인정보 수집 항목</h4>
                                        <h5>(1) 고객 주문정보(온라인전용 회원일 경우만)</h5>
                                        <h5>- 필수사항: 본인확인기관에서 제공하는 본인인증결과값(CI/DI)</h5>
                                        <h5>(2) 수취인 및 배송지 정보</h5>
                                        <h5>- 필수사항 : 수취인 성명, 휴대폰번호, 배송지 주소</h5>
                                        <h5>※ 대금결제시 수집하는 개인정보는 결제대행업체(PG사)에서 수집 및 저장하고 있으며, 회사는 결제대행업체에서 제공하는 거래내역만을 제공받고 있습니다.</h5>
                                        <h5>(3) 서비스 이용 또는 업무처리과정에서 자동으로 생성되어 수집되는 정보</h5>
                                        <h5>- 필수사항 : 접속 IP 정보, 쿠키, 서비스 이용 기록, 접속 로그</h5>
                                    </li>
                                    <li>
                                        <h4>3. 개인정보 보유 및 이용기간</h4>
                                        <h5>회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기하는 것을 원칙으로 합니다. 단, 「전자상거래 등에서의 소비자 보호에 관한 법률」 등 관련 법령의 규정에 의하여 보존할 필요가 있는 경우 관계 법령에서 정한 일정기간 동안 고객정보를 보관합니다. 해당 정보는 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.</h5>
                                        <h3>(1) 재화 또는 서비스의 제공: 재화 또는 서비스의 공급완료 및 요금결제 정산 완료 시까지. 다만, 제품교환 및 환불요구 등 고객응대를 위해 배송완료 후 24개월 까지 보관 후 파기</h3>
                                        <h3>(2) 계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)</h3>
                                        <h3>(3) 대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)</h3>
                                        <h3>(4) 로그기록 : 3개월 (통신비밀보호법)</h3>
                                    </li>
                                    <li>
                                        <h5>개인정보 수집 및 이용안내에 관한 사항에 대해 동의를 거부할 수 있습니다. 다만, 동의를 거부할 경우 주문 및 배송서비스 이용이 불가함을 알려드립니다.</h5>
                                    </li>
                                </ul>
                            </div>                        
                        }
                            <div className='mypage-myinfo-update-btn'>
                                <button>저장</button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
    );
}

