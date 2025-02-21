import Button from "../../commons/Button.jsx";
import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext.js";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LoginTab1({ isActive }) {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const initForm = { 'id': '', 'pwd': '' };

    // useState 초기값을 localStorage에서 가져오기
    const [formData, setFormData] = useState({
        id: localStorage.getItem("savedId") || "",
        pwd: "",
    });
    const [errMsg, setErrMsg] = useState(initForm);
    const [isSaveIdChecked, setIsSaveIdChecked] = useState(localStorage.getItem("saveId") === "true");
                          //localStorage.getItem("saveId") === "true"이면 체크 상태 유지. - 불리언 반환
    const refs = {
        idRef: useRef(null),
        pwdRef: useRef(null),
    };

    // 입력값 변경 핸들러
    const handleChangeForm = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrMsg({ ...errMsg, err: "" });
    };

    // "아이디 저장" 체크박스 핸들러
    const handleSaveIdChange = (event) => {
        const checked = event.target.checked; //true, false
        // console.log(checked);
        setIsSaveIdChecked(checked);

        if (!checked) {
            localStorage.removeItem("savedId"); // 체크 해제하면 저장된 아이디 삭제
            localStorage.removeItem("saveId");
        }
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            console.log('send data --> ', formData);

            axios.post('http://localhost:9000/user/login', formData)
                .then(res => {
                    console.log('res.data --> ', res.data);
                    if (res.data.result_rows === 1) {
                        alert('로그인 성공!');
                        localStorage.setItem("token", res.data.token);
                        setIsLoggedIn(true);
                        navigate('/');

                        // "아이디 저장"이 체크된 경우, localStorage에 저장
                        if (isSaveIdChecked) {
                            localStorage.setItem("savedId", formData.id);
                            localStorage.setItem("saveId", "true");
                        }
                    } else {
                        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                        setErrMsg({ ...errMsg, err: "아이디 또는 비밀번호가 일치하지 않습니다." });

                        refs.idRef.current.value = '';
                        refs.pwdRef.current.value = '';
                        refs.idRef.current.focus();
                    }
                })
                .catch(err => console.log(err));
        }
    };

    // 유효성 검사 함수
    const validate = () => {
        if (refs.idRef.current.value === '') {
            alert('아이디를 입력해주세요.');
            refs.idRef.current.focus();
            return false;
        } else if (refs.pwdRef.current.value === '') {
            alert('비밀번호를 입력해주세요.');
            refs.pwdRef.current.focus();
            return false;
        }
        return true;
    };

    return (
        <div id="tab1" className={isActive ? "on" : ""}>
            <form onSubmit={handleLoginSubmit}>
                <div className="signIn-form" style={{ backgroundColor: "yellowgreen" }}>
                    <div>
                        <div className="input-box">
                            <label htmlFor="userId" className="wa-hidden">아이디</label>
                            <input type="text"
                                name="id"
                                ref={refs.idRef}
                                value={formData.id}
                                onChange={handleChangeForm}
                                placeholder="아이디" />
                        </div>

                        <div className="input-box">
                            <label htmlFor="password" className="wa-hidden">비밀번호</label>
                            <input type="password"
                                name="pwd"
                                ref={refs.pwdRef}
                                onChange={handleChangeForm}
                                placeholder="비밀번호" />
                        </div>
                    </div>
                    <button type="submit">로그인</button>
                </div>
                <p style={{ height: "10px", textAlign: "left", padding: "5px", color: "red", fontSize: "0.7rem" }}>
                    {<>{errMsg.err}</>}
                </p>

                <div className="save_id">
                    <span className="checkbox">
                        <input className="checkBox"
                            type="checkbox"
                            id="cb01"
                            name="saveId"
                            checked={isSaveIdChecked}
                            onChange={handleSaveIdChange} />
                        <label htmlFor="cb01"><i></i>아이디 저장</label>
                    </span>
                </div>
            </form>
            <div className="link">
                <a href="#">아이디 찾기</a>
                <a href="#">비밀번호 찾기</a>
                <a href="#" className="colorDark">회원가입</a>
            </div>

            <dl className="login_sns">
                <dt><span>SNS 계정으로 로그인</span></dt>
                <dd>
                    <a href="#" id="oLoginKaKaoLink" className="kakao box" title="새창열림">카카오 로그인</a>
                    <a href="#" className="naver box" title="새창열림">네이버 로그인</a>
                </dd>
            </dl>
            <Link to='/order'><Button title="비회원 주문" width="100%"></Button></Link>
        </div>
    );
}
