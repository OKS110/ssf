import React, { useState, useEffect, useContext, useRef } from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import PersonUIform from '../PersonUIform.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { CustomersContext } from '../../../context/CustomersContext.js';
import { useCustomers } from '../../../hooks/useCustomers.js';

export default function DeliveryMyinfo({ addressClick }) {
    console.log(addressClick);
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false); //체크박스 상태 관리
    const [isChecked2, setIsChecked2] = useState(false); //체크박스 상태 관리
    const handleChecked1 = (e) => { setIsChecked1(e.target.checked); }
    const handleChecked2 = (e) => { setIsChecked2(e.target.checked); }
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    const id = localStorage.getItem('user_id');
    const { customer } = useContext(CustomersContext);
    const { getCustomer } = useCustomers();

    const handleDesc = (name) => {
        setOpen(name);
    }
    const deliverySave = () => {
        setSuccess(true)
    }
    useEffect(() => {
        const fetchCustoerList = async () => {
            await getCustomer(id);
        }
        fetchCustoerList();
    }, [])

    return (
        <div className="mypage-box">
            <div className="mypage-top-menu">
                <span>Home</span>
                <SlArrowRight className="mypage-top-menu-icon" />
                <span ><Link to='/person' className='mypage-link' >마이페이지</Link></span>
            </div>
            <div className="mypage-top-box-flex">
                <div className="mypage-top-box-empty"></div>
                <div className="mypage-top-box  mypage-Title">배송지 관리</div>
            </div>
            <div className="mypage-bottom-box">
                <PersonUIform />
                <article className="mypage-bottom-right">
                    {!success && <div className='mypage-myinfo-delivery'>
                        <h5>등록된 배송지가 없습니다.</h5>
                        <h5>'배송지 추가' 하고 더 편리한 쇼핑을 즐겨보세요.</h5>
                        <div className='btn-wrapper'>
                            <button className='modal-open-btn' onClick={() => setModalOpen(true)}>
                                배송지 추가
                            </button>
                        </div>
                    </div>}

                    {
                        modalOpen &&
                        <div className='modal-container' ref={modalBackground} onClick={e => {
                            if (e.target === modalBackground.current) {
                                setModalOpen(false);
                            }
                        }}>
                            <div className='modal-content mypage-myinfo-delivery-addbox'>
                                <h3>배송지 추가</h3>
                                <ul>
                                    <li>
                                        <label htmlFor="">이름</label>
                                        <input type="text" />
                                    </li>
                                    <li>
                                        <label htmlFor="">휴대폰번호</label>
                                        <input type="text" />
                                    </li>
                                    <li>
                                        <label htmlFor="">주소</label>
                                        <input type="text" />
                                        <button>주소찾기</button>
                                    </li>
                                    <li>
                                        <input type="text" />
                                    </li>
                                    <li>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <div className='mypage-myinfo-delivery-check'>
                                    <input type="checkbox" checked={isChecked1} onChange={handleChecked1} /><span>기본배송지 지정</span>
                                </div>
                                <div className='mypage-myinfo-delivery-check2'>
                                    <div className='mypage-myinfo-delivery-check'>
                                        <input type="checkbox" checked={isChecked2} onChange={handleChecked2} />
                                        <span>주소정보 수집 및 이용 동의</span>
                                    </div>
                                    <div>
                                        <span>약관보기</span>
                                        {open === true ? <span onClick={() => { handleDesc(false) }}> <SlArrowUp /> </span> :
                                            <span onClick={() => { handleDesc(true) }}> <SlArrowDown /></span>}
                                    </div>
                                </div>
                                {open &&
                                <div className='mypage-myinfo-delivery-agree'>
                                    <h4>1. 배송지 정보 수집 및 이용 동의</h4>
                                        <p>회사는 회원의 배송지 관리를 위해 아래와 같이 개인정보를 수집합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오.</p>
                                    <h4>2. 수집하는 개인정보 항목 및 수집방법</h4>
                                        <p>(1) 수집 항목</p>
                                        <p>이름, 휴대폰번호, 주소</p>
                                        <p>(2) 수집 방법</p>
                                        <p>온라인 홈페이지 및 모바일 APP</p>
                                    <h4>3. 개인정보의 처리 및 보유기간</h4>
                                    <h4>회사는 회원 탈퇴 시 또는 마이페이지 - 배송지 관리 메뉴에서 삭제 시 해당 정보를 지체없이 파기합니다.</h4>
                                        <p>개인정보 수집 및 이용 안내에 관한 사항에 대해 동의를 거부할 수 있습니다. 다만, 배송지 추가 서비스를 이용하실 수 없습니다.</p>
                                </div>
                                }
                                <div className='mypage-myinfo-delivery-btn'>
                                    <button className='modal-close-btn' 
                                        onClick={() => {setModalOpen(false)
                                                    deliverySave()}
                                        }>
                                            저장
                                    </button>
                                </div>
                            </div>
                        </div>
                    }                    
                    {success &&
                        <div className='mypage-myinfo-delivery-success-container'>
                            <div className='mypage-myinfo-delivery-successbox'>
                                <div>
                                    <input type="checkbox" />
                                    <div>
                                        <span>홍</span>
                                        {/* <span>기본배송지</span> */}
                                        <p>010-3333-5555</p>
                                        <p>06111 서울특별시 강남구 강남대로128길 79(논현동) 101호</p>
                                    </div>
                                </div>
                                <div>
                                    <button>수정</button>
                                    <button >삭제</button>
                                </div>
                            </div>
                            <div>
                                <button>배송지 추가</button>
                                <button>기본배송지 지정</button>
                            </div>
                        </div>
                    }
                    {addressClick === true &&
                        <div className='mypage-myinfo-delivery-success-container'>
                            <div className='mypage-myinfo-delivery-successbox'>
                                <div>
                                    <input type="checkbox" />
                                    <div>
                                        <span>{customer.name}</span>
                                        {/* <span>기본배송지</span> */}
                                        <p>{customer.phone}</p>
                                        <p>{customer.zipcode} {customer.address} {customer.additional_address}</p>
                                    </div>
                                </div>
                                <div>
                                    <button>수정</button>
                                    <button >삭제</button>
                                </div>
                            </div>
                            <div>
                                <button>배송지 추가</button>
                                <button>기본배송지 지정</button>
                            </div>
                        </div>
                    }
                </article>
            </div>
        </div>
    );
}

