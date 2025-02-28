import React, { useState, useEffect, useContext } from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import PersonUIform from '../PersonUIform.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { CustomersContext } from '../../../context/CustomersContext.js';
import { useCustomers } from '../../../hooks/useCustomers.js';

export default function DeliveryMyinfo({ addressClick }) {
    console.log(addressClick);
    
    const [modal, setModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false); //체크박스 상태 관리
    const [isChecked2, setIsChecked2] = useState(false); //체크박스 상태 관리
    const handleChecked1 = (e) => { setIsChecked1(e.target.checked); }
    const handleChecked2 = (e) => { setIsChecked2(e.target.checked); }

    const handleModal = () => {
        setModal(true);
    }
    const CheckModal = () => {
        setModal(false);
        setSuccess(true);
    }
    const id = localStorage.getItem('user_id');
    const { customer } = useContext(CustomersContext);
    const { getCustomer } = useCustomers();

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
                        <button onClick={handleModal}>배송지 추가</button>
                    </div>}
                    {modal &&
                        <div className='mypage-myinfo-delivery-addbox'>
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
                                    {/* {open !== true ? <span onClick={() => { handleDesc(true) }}> <SlArrowDown /> </span> :
                                        <span onClick={() => { handleDesc(false) }}> <SlArrowUp /></span>} */}
                                </div>
                            </div>
                            <div className='mypage-myinfo-delivery-btn'>
                                <button onClick={CheckModal}>저장</button>
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

