import React,{useState, useEffect, useRef, useContext} from 'react';
import { SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import PersonUIform from '../PersonUIform.jsx';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import DaumPostcode from "react-daum-postcode";
import { CustomersContext } from '../../../context/CustomersContext.js';
import { useCustomers } from '../../../hooks/useCustomers.js';
import axios from 'axios';

export default function UpdateInfo() {
    const [addressValue, setAddressValue] = useState('');
    const handleChangeInputAddressData = (e) => {
        setAddressValue(e.target.value);
    };
    // console.log('addressValue',addressValue);
    


    const [adata, setAdata] = useState({});
    
    /** 주소검색 버튼Toggle */
    const [isOpen, setIsOpen] = useState(false);
    /** 주소 검색 버튼 */
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const {customer} = useContext(CustomersContext);
    const { getCustomer } = useCustomers();

    useEffect( () => {
        const fetchCustoerList = async() => {
            const id = localStorage.getItem('user_id');
            await getCustomer(id);
        }
        fetchCustoerList();
    }, [])
    
    // console.log('customer',customer); 

    const navigate = useNavigate();
    const [updateData, setUpdateData] = useState({});   // 회원정보 변경 되면 여기 저장됨
    const [open,setOpen] = useState(false);
    // 변경을 누르면 true 가 되고 변경완료를 누르면 false 가 된다
    const [btnChangeClick, setBtnChangeClick] = useState({
        'id':false,
        'pwd':false,
        'name':false,
        'phone':false,
        'email':false,
        'address':false,
        'extra':false,
        'zoneCode':false
    });
    const [isChecked1, setIsChecked1] = useState(false); //체크박스 상태 관리
    const [isChecked2, setIsChecked2] = useState(false); //체크박스 상태 관리
    const handleChecked1 = (e) => {setIsChecked1(e.target.checked);}
    const handleChecked2 = (e) => {setIsChecked2(e.target.checked);}    

    const handleDesc = (name) => {
        setOpen(name);
    }
    // 버튼 클릭 핸들러
    const handle = (type) => {
        setBtnChangeClick(prev => ({   // setBtnChangeClick 가 관리하는 값들이 prev 야
            ...prev,
            [type]: !prev[type]  // 클릭한 타입만 토글
        }));
       
    };
    //---- DaumPostcode 관련 디자인 및 이벤트 시작 ----//
    const themeObj = {
        bgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        postcodeTextColor: "#C05850",
        emphTextColor: "#222222",
    };
    const postCodeStyle = {
        width: "700px",
        height: "700px",
    };

    const completeHandler = (data) => {
        // console.log(data.zonecode);
        // console.log('주소',data.address);     
        setAdata({...adata, zoneCode: data.zonecode, address: data.address , fullAddress:data.zonecode.concat(data.address)});
        setAddressValue(data.zonecode.concat(data.address));
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

    const handleChangeInputData = (e) =>  {
        const { name , value} = e.target;
        setUpdateData({...updateData, [name]:value});   
                       
    }

    const refs = {
        'idRef':useRef(null),
        'pwRef':useRef(null),
        'nameRef':useRef(null),
        'phoneRef':useRef(null),
        'emailRef':useRef(null),
        'addressRef':useRef(null),
        'extraAddressRef':useRef(null)
    }

    const updateValidate = () => {
        if(refs.idRef.current.value === ''){
            alert('아이디를 입력해주세요');
            refs.idRef.current.focus();
            return false;
        }else if(refs.pwRef.current.value === ''){
            alert('비밀번호를 입력해주세요');
            refs.pwRef.current.focus();
            return false;
        }else if(refs.nameRef.current.value === ''){
            alert('이름을 입력해주세요');
            refs.nameRef.current.focus();
            return false;
        }else if(refs.phoneRef.current.value === ''){
            alert('폰번호를 입력해주세요');
            refs.phoneRef.current.focus();
            return false;
        }else if(refs.emailRef.current.value === ''){
            alert('이메일을 입력해주세요');
            refs.emailRef.current.focus();
            return false;
        }else if(refs.addressRef.current.value === ''){
            alert('주소를 입력해주세요');
            refs.addressRef.current.focus();
            return false;
        }
    }
    
    const handleUpdateInfo = (e) => {
        e.preventDefault();
        // 유효성검사
        if(!updateValidate) {
            alert('빈값있으면 안댐 !')
            return false;
        }else if(isChecked2 === false){
            alert('정보수집 이용동의를 진행해주세요');            
        }
        else if(isChecked1 === true){
            // 해당 주소를 기본 배송지에 저장해야함
            alert('기본배송지로 저장되었습니다');
        }else if(updateValidate) {
            // 서버로 바뀐 내용 전달 updateData  axios.update 일꺼임
            axios.put('http://localhost:9000/mypage/updateInfo',{"addressValue":addressValue,"updateData":updateData})
                .then(res => console.log(res.data)
                )
                .catch(error => console.log(error)
                );
            alert('회원정보 수정이 완료되었습니다');
            navigate('/person');
        }
        // console.log(updateData);
        
    }    





    return (
        <form onSubmit={handleUpdateInfo}>
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
                                <li className='mypage-myinfo-none-update-idbox'>
                                    <label htmlFor="">아이디</label>
                                    <input type="text" className='mypage-myinfo-update-input'
                                        value={customer.username}/>
                                </li>
                                <li>
                                    <label htmlFor="">비밀번호</label>
                                    <input type='password'
                                        ref={refs.pwRef}
                                        name='pwd'
                                        onChange={btnChangeClick.pwd === true ? handleChangeInputData : null}
                                        className={btnChangeClick.pwd ? 'mypage-myinfo-update-input' : 'mypage-myinfo-none-update-input'}
                                        value={btnChangeClick.pwd ? null : (
                                            updateData.pwd === undefined ? customer.password : updateData.pwd
                                            )}
                                            />   
                                    <button type='button'  onClick={()=>{handle('pwd')}}>
                                        {btnChangeClick.pwd ? '변경 완료' : '변경'}
                                    </button>
                                </li>
                                <li>
                                    <label htmlFor="">이름</label>
                                    <input type={btnChangeClick.name ? 'text' : 'readonly'}
                                        ref={refs.nameRef}
                                        name='name'
                                        onChange={btnChangeClick.name === true ? handleChangeInputData : null}
                                        className={btnChangeClick.name ? 'mypage-myinfo-update-input' : 'mypage-myinfo-none-update-input'}
                                        value={btnChangeClick.name ? null : (
                                            updateData.name === undefined ? customer.name : updateData.name
                                            )}
                                            />   
                                    <button type='button'  onClick={()=>{handle('name')}}>
                                        {btnChangeClick.name ? '변경 완료' : '변경'}
                                    </button>
                                </li>
                                <li>
                                    <label htmlFor="">휴대폰번호</label>
                                    <input type={btnChangeClick.phone ? 'tel' : 'readonly'} 
                                        ref={refs.phoneRef}
                                        name='phone'
                                        onChange={btnChangeClick.phone === true ? handleChangeInputData : null}
                                        className={btnChangeClick.phone ? 'mypage-myinfo-update-input' : 'mypage-myinfo-none-update-input'}
                                        value={btnChangeClick.phone ? null : (
                                            updateData.phone === undefined ? customer.phone : updateData.phone
                                            )}
                                            />   
                                    <button type='button'  onClick={()=>{handle('phone')}}>
                                        {btnChangeClick.phone ? '변경 완료' : '변경'}
                                    </button>
                                </li>
                                <li>
                                    <label htmlFor="">이메일</label>
                                    <input type={btnChangeClick.email ? 'text' : 'readonly'}
                                        ref={refs.emailRef}
                                        name='email'
                                        onChange={btnChangeClick.email === true ? handleChangeInputData : null}
                                        className={btnChangeClick.email ? 'mypage-myinfo-update-input' : 'mypage-myinfo-none-update-input'}
                                        value={btnChangeClick.email ? null : (
                                            updateData.email === undefined ? customer.email : updateData.email
                                            )}
                                            />   
                                    <button type='button'  onClick={()=>{handle('email')}}>
                                        {btnChangeClick.email ? '변경 완료' : '변경'}
                                    </button>
                                </li>
                                <li className='mypage-myinfo-update-addressbox'>
                                    <label htmlFor="">주소</label>
                                    <input type={btnChangeClick.address ? 'readonly' : 'readonly'}
                                        ref={refs.addressRef}
                                        name='address'
                                        onChange={btnChangeClick.email === true ? handleChangeInputAddressData : null}
                                        className={btnChangeClick.address ? 'mypage-myinfo-update-input' : 'mypage-myinfo-none-update-input'}
                                        value={btnChangeClick.address ? null : (
                                            addressValue === '' ? customer.address : adata.fullAddress
                                            )}/>                                               
                                    <button type='button'  onClick={()=>{
                                            handle('address');
                                            handleToggle();
                                        }}>
                                        {btnChangeClick.address ? '변경 완료' : '주소 변경'}
                                    </button>
                                </li>
                                <li className='mypage-myinfo-update-addressbox2'>
                                    <input type={btnChangeClick.address ? 'text' : 'readonly'}
                                        ref={refs.extraAddressRef}
                                        name='extra'
                                        onChange={btnChangeClick.address === true ? handleChangeInputData : null}
                                        className={btnChangeClick.address ? 'mypage-myinfo-update-input' : 'mypage-myinfo-none-update-input'}
                                        value={btnChangeClick.extra ? null : (
                                            updateData.extra === undefined ? customer.additional_address : updateData.extra
                                            )}
                                            />
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
                            </ul>
                            <div className='mypage-myinfo-update-check1'>
                                <input type="checkbox" checked={isChecked1} onChange={handleChecked1} /><span>기본배송지 지정</span>
                            </div>
                            <div className='mypage-myinfo-update-check2'>
                                <div>
                                    <input type="checkbox"  checked={isChecked2} onChange={handleChecked2}/>
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
                                <button type='submit'>저장</button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </form>
    );
}

