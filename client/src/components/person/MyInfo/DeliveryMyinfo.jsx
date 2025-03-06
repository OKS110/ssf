import React, { useState, useEffect, useContext, useRef } from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import PersonUIform from '../PersonUIform.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { CustomersContext } from '../../../context/CustomersContext.js';
import { useCustomers } from '../../../hooks/useCustomers.js';
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';
import DeliveryUpload from '../DeliveryUpload.jsx';
import Form from 'react-bootstrap/Form';


export default function DeliveryMyinfo() {
  const [add1, setAdd1] = useState();
    const [add2, setAdd2] = useState();
    const [none, setNone] = useState(() => {
        if (add1) {
            setNone(false)
        } else if (add2) {
            setNone(false)
        } else if (add2 === false) {
            setNone(true)
        }
    });
    const [open, setOpen] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [notOrigin, setNotOrigin] = useState(false);
    const handleChecked1 = (e) => { setIsChecked1(e.target.checked); }
    const handleChecked2 = (e) => { setIsChecked2(e.target.checked); }
    const ChangeOrigin = (e) => { setNotOrigin(e.target.checked); }
    const [modalOpen, setModalOpen] = useState(false);
    const [adata, setAdata] = useState({});
    const modalBackground = useRef();
    const id = localStorage.getItem('user_id');
    const [deliForm, setDeliForm] = useState({ 'name': '', 'phone': '', 'extraAddress': '' });
    const handleDesc = (name) => {
        setOpen(name);
    }
    const { customer } = useContext(CustomersContext);
    const { getCustomer } = useCustomers();
    useEffect(() => {
        const fetchCustoerList = async () => {
            await getCustomer(id);
        }
        fetchCustoerList();
    }, [add1, add2])



    const refs = {
        'nameRef': useRef(null),
        'phoneRef': useRef(null),
        'addressRef': useRef(null),
        'zipcodeRef': useRef(null),
        'extraAddressRef': useRef(null)
    };
    const completeHandler = (data) => {
        setAdata({ ...adata, zoneCode: data.zonecode, address: data.address });
        setDeliForm({ ...deliForm, zoneCode: data.zonecode, address: data.address });
        setInputValue({ ...deliForm, zoneCode: data.zonecode, address: data.address });
    };

    const handleDelivery = (e) => {
        const { name, value } = e.target;
        setDeliForm({ ...deliForm, [name]: value });
    };
    // console.log('deliForm', deliForm);

    const validate = () => {
        if (refs.nameRef.current.value === '') {
            refs.nameRef.current.focus();
            return false;
        } else if (refs.phoneRef.current.value === '') {
            refs.phoneRef.current.focus();
            return false;
        } else if (refs.phoneRef.current.value.length < 11) {
            refs.phoneRef.current.focus();
            return false;
        } else if (refs.extraAddressRef.current.value === '') {
            refs.extraAddressRef.current.focus();
            return false;
        } else if (isChecked2 === false) {
            alert('개인정보수집 이용에 동의를 진행해주세요');
            return false;
        } else if (refs.addressRef.current.value === '') {
            refs.addressRef.current.focus();
            return false;
        } else if (refs.zipcodeRef.current.value === '') {
            refs.zipcodeRef.current.focus();
            return false;
        } else {
            return true;
        }
    }
    const deliverySave = async () => {
        if (validate() && isChecked1 === true) {
            await axios.post('http://localhost:9000/mypage/updateDelivery', { deliForm, 'id': id })
                .then(res => {
                    if (res.data.result === 1) {
                        localStorage.setItem('delisave', true);
                        setAdd1(true);
                        getCustomer(id);
                        setNone(false);
                    }
                })
                .catch(err => console.log(err)
                );

        } 
        // else if (validate() && isChecked1 === false) {
        //     await axios.post('http://localhost:9000/mypage/updateDeliveryExtra', { deliForm, 'id': id })
        //         .then(res => {
        //             if (res.data.result === 1) {
        //                 // console.log(res.data);
        //                 setAdd2(true);
        //                 getCustomer(id);
        //                 setNone(false);
        //             }
        //         })
        //         .catch(err => console.log(err));
        // }
        else {
            // alert('빈값 x');
        }
    }
    // console.log('storageData', add1);



    const deliveryDelete = () => {
        axios.post('http://localhost:9000/mypage/deleteDelivery', { 'id': id })
            .then(res => {
                console.log(res.data);
                setAdd2(false);
                getCustomer(id);
            })
            .catch(err => console.log(err));
    }


    /** 주소검색 버튼Toggle */
    const [isOpen, setIsOpen] = useState(false);
    /** 주소 검색 버튼 */
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    //---- DaumPostcode 관련 디자인 및 이벤트 시작 ----//
    const themeObj = {
        bgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        postcodeTextColor: "#C05850",
        emphTextColor: "#222222",
    };
    const postCodeStyle = {
        width: "400px",
        height: "300px",
    };

    // console.log('주소',adata);

    const closeHandler = (state) => {
        if (state === "FORCE_CLOSE") {
            setIsOpen(false);
        } else if (state === "COMPLETE_CLOSE") {
            setIsOpen(false);
        }
    };
    //---- DaumPostcode 관련 디자인 및 이벤트 종료 ----//

    // 기본배송지 지정 함수
    const ChangeOriginDelivery = async () => {
        if (notOrigin) {
            alert('기본배송지가 변경되었습니다.');
            setNotOrigin(false);
            const deliForm = {
                'zoneCode': customer.additional_address.slice(0, 5),
                'address': customer.additional_address.slice(5, customer.additional_address.indexOf('@')),
                'extraAddress': customer.additional_address.slice(customer.additional_address.indexOf('@') + 1, customer.additional_address.indexOf('/'))
            };
            await axios.post('http://localhost:9000/mypage/updateDelivery', { deliForm, 'id': id })
                .then(res => {
                    if (res.data.result === 1) {
                        localStorage.setItem('delisave', true);
                        setAdd1(true);
                        getCustomer(id);
                        setNone(false);
                        deliveryDelete();
                    }
                })
                .catch(err => console.log(err));
        }
    }




    const [dataList, setDataList] = useState([]);
    const [inputValue, setInputValue] = useState({ 'name': '', 'phone': '', 'zipcode': '' });

    const handleFileUpload = (e) => {
        setInputValue(e.target.value);
    }
    const handleBlur = () => {
        const formData = new FormData();
        formData.append('data', inputValue);
        axios.post('http://localhost:9000/deliveryUploads', formData)
            .then(res => console.log('서버에서가져옴', res.data))
            .catch(error => console.log(error));
    }

// 서버에서 status200 에러나는데 
    useEffect(() => {
        axios.get('http://localhost:9000/deliveryUploads') // 서버에서 데이터 가져오기
            .then(res => {
                console.log("🚀 서버 응답:", JSON.stringify(res.data.data, null, "\t"));
                setDataList(res.data.data); // 상태 업데이트
                // setDataList(JSON.stringify(res.data.data)); // 상태 업데이트
            })
            .catch(error => console.log(error));
    }, []); 

    // console.log('dataList', dataList);
    console.dir(dataList[0]);

  


    return (
        <div className="mypage-box">
{                    dataList.map((item)=>                            
                                <h5>{item}</h5>
                            
                        )}
            {/* {dataList.length > 0 ? (
                    dataList.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li> // 개별 데이터 출력
                    ))
                ) : (
                    <p>저장된 데이터가 없습니다.</p>
                )} */}

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
                    {none &&
                        <div className='mypage-myinfo-delivery'>
                            <h5>등록된 배송지가 없습니다.</h5>
                            <h5>'배송지 추가' 하고 더 편리한 쇼핑을 즐겨보세요.</h5>
                            <div className='btn-wrapper'>
                                <button className='modal-open-btn' onClick={() => setModalOpen(true)} type='button'>
                                    배송지 추가
                                </button>
                            </div>
                        </div>
                    }
                    {modalOpen &&
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
                                        <Form.Control
                                        name='name'
                                            type='text'
                                            onChange={(e) => {
                                                handleFileUpload(e)
                                                handleDelivery(e)
                                            }}
                                            // onBlur={handleBlur} 
                                            className='addDeli'
                                            ref={refs.nameRef}
                                        >
                                        </Form.Control>
                                        {/* <input 
                                            type="text" name='name'
                                            onChange={handleDelivery}
                                            ref={refs.nameRef}
                                        /> */}
                                    </li>
                                    <li>
                                        <label htmlFor="">휴대폰번호</label>
                                        {/* <input type="number" name='phone'
                                            onChange={handleDelivery}
                                            ref={refs.phoneRef}
                                        /> */}
                                        <Form.Control
                                            type='number'
                                            onChange={(e) => {
                                                handleFileUpload(e)
                                                handleDelivery(e)
                                            }}
                                            // onBlur={handleBlur} 
                                            className='addDeli'
                                            ref={refs.phoneRef}
                                            name='phone'
                                        >
                                        </Form.Control>
                                    </li>
                                    <li>
                                        <label htmlFor="">주소</label>
                                        {/* <input type="text" name='zipcode' placeholder='우편번호'
                                            ref={refs.zipcodeRef}
                                            value={adata.zoneCode} /> */}
                                        <Form.Control
                                            type='text'
                                            onChange={(e) => {
                                                handleFileUpload(e)
                                                handleDelivery(e)
                                            }}
                                            // onBlur={handleBlur} 
                                            className='addDeli'
                                            value={adata.zoneCode}
                                            ref={refs.zipcodeRef}
                                            name='zipcode'
                                        >
                                        </Form.Control>
                                        <button onClick={handleToggle}>주소찾기</button>
                                    </li>
                                    {isOpen &&
                                        <div>
                                            <DaumPostcode
                                                className="postmodal"
                                                theme={themeObj}
                                                style={postCodeStyle}
                                                onComplete={completeHandler}
                                                onClose={closeHandler}
                                            />
                                        </div>
                                    }
                                    <li>
                                        <input type="text" name='address' placeholder='주소'
                                            ref={refs.addressRef}
                                            value={adata.address}
                                        />
                                    </li>
                                    <li>
                                        <input type="text" name='extraAddress' placeholder='상세주소'
                                            onChange={handleDelivery}
                                            ref={refs.extraAddressRef}
                                        />
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
                                        onClick={() => {
                                            setModalOpen(false)
                                            deliverySave()
                                            handleBlur()
                                        }
                                        }>
                                        저장
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {!none && <>
                        <h5 className='mypage-myinfo-delivery-msg'>기본배송지는 삭제가 불가능합니다.</h5>
                        <div className='mypage-myinfo-delivery-success-container'>
                            {
                                (localStorage.getItem('delisave'))
                                &&
                                <div className='mypage-myinfo-delivery-successbox'>
                                    <div>
                                        <input type="checkbox" onClick="return false;" />
                                        <div>
                                            <span>{customer.name}</span>
                                            {localStorage.getItem('delisave') && <span>기본배송지</span>}
                                            <p>{customer.phone}</p>
                                            <p>
                                                <span>{customer.zipcode}</span>
                                                <span>{customer.address}</span>
                                                <span>{customer.extra_address}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            }
                            {customer.additional_address &&
                                <div className='mypage-myinfo-delivery-successbox'>
                                    <div>
                                        <input type="checkbox" checked={notOrigin} onChange={ChangeOrigin} />
                                        <div>
                                            <span>{customer.additional_address.slice(customer.additional_address.indexOf('/') + 1, customer.additional_address.indexOf('#'))}</span>
                                            <p>{customer.additional_address.slice(customer.additional_address.indexOf('#') + 1, customer.additional_address.length)}</p>
                                            <p>
                                                <span>{customer.additional_address.slice(0, 5)}</span>
                                                <span>{customer.additional_address.slice(5, customer.additional_address.indexOf('@'))}</span>
                                                <span>{customer.additional_address.slice(customer.additional_address.indexOf('@') + 1, customer.additional_address.indexOf('/'))}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => setModalOpen(true)}>수정</button>
                                        <button onClick={deliveryDelete}>삭제</button>
                                    </div>
                                </div>
                            }
                            <div>
                                <button onClick={() => setModalOpen(true)}>배송지 추가</button>
                                <button onClick={ChangeOriginDelivery}>기본배송지 지정</button>
                            </div>
                        </div>
                    </>
                    }
                </article>
            </div>
        </div>
    );
}

// 배송지에 이름 전번 까지 나오게 행 그럼 이름 전번도 additonal 에 넣어서 가져오ㅑ애할듯 주소 맨뒤에 넣어라...