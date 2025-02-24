import React, { useEffect, useState } from 'react';

export default function PopUp() {
    const [isOpened, setIsOpened] = useState(true); // 팝업창 관리
    console.log("isOpened -->", isOpened);

    /** 날짜 **/
    const date = new Date();
    // 오늘 하루 그만 보기 클릭한 날짜 + 1 (만료일)
    const VISITED_DATE = localStorage.getItem("POP_UP_CHECK");
    // 현재 날짜
    const NOW_DATE = new Date().getDate();
    console.log('VISITED_DATE --> ', VISITED_DATE);
    console.log('NOW_DATE --> ', NOW_DATE);

    useEffect(() => {
        if (VISITED_DATE) {
            if (VISITED_DATE === NOW_DATE) { // 클릭한 날짜와 방문 날짜가 같으면 팝업 노출
                setIsOpened(true);
                localStorage.removeItem("POP_UP_CHECK");
            } else { // 클릭한 날짜와 방문 날짜가 다르면 팝업 비노출
                setIsOpened(false);
            }
        }
    }, []);

    const handleDayClosed = () => {
        const expireDate = date.getDate()+1;
        localStorage.setItem("POP_UP_CHECK", expireDate);
        setIsOpened(false);
    }

    return (
        <>
        {
            isOpened &&
            <div className='mainAdPopup-wrap'>
                <div className='mainAdPopup-content'>
                    <img src="https://img.ssfshop.com/display/html/PROMT/20250114/p_w3_261506_con01.png" alt="" />
                </div>
                <div className='mainAdPopup-btns'>
                    <button onClick={handleDayClosed}>오늘 하루 보지 않기</button>
                    <button onClick={() => setIsOpened(!isOpened)}>닫기</button>
                </div>
            </div>
        }
        </>
    );
}