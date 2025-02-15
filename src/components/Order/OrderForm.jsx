import React, { useState } from "react";

export default function OrderForm({ formData, setFormData, resetForm }) {
    // 입력 값 변경 핸들러
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value }); // 부모 컴포넌트의 상태 업데이트
        console.log(`${name}: ${value}`); // 실시간 콘솔 출력
    };

    return (
        <>
            <h4>
                배송지 정보
                <div className="btns">
                    <button type="button" className="btn gray" onClick={resetForm}>
                        새로입력
                    </button>
                </div>
            </h4>
            <div className="input_wrap">
                <div className="row">
                    <label htmlFor="name" className="required">이름</label>
                    <span className="input_box">
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="이름 입력" className="reset" />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="phone" className="required">휴대폰</label>
                    <span className="input_box">
                        <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="휴대폰 입력" className="reset" />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="email" className="required">이메일 주소</label>
                    <span className="input_box">
                        <input id="email" name="email" type="text" value={formData.email} onChange={handleChange} placeholder="이메일 입력" className="reset" />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="address" className="required">배송 주소</label>
                    <span className="input_box">
                        <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="배송 주소 입력" className="reset" />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="message" className="required">배송 메시지</label>
                    <span className="input_box">
                        <input id="message" name="message" type="text" value={formData.message} onChange={handleChange} placeholder="배송 메시지 입력" className="reset" />
                    </span>
                </div>
            </div>
        </>
    );
}
