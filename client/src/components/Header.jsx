import { Link } from "react-router-dom";
import Nav from "../commons/Nav.jsx";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { AiOutlineShopping } from "react-icons/ai";
import { AuthContext } from "../auth/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export default function Header() {
    // 헤더 메뉴 시작
    const categories = [
        { label: "여성", link: "#" },
        { label: "남성", link: "#" },
        { label: "키즈", link: "#" },
        { label: "럭셔리", link: "#" },
        { label: "백&슈즈", link: "#" },
        { label: "스포츠", link: "#" },
        { label: "골프", link: "#" },
        { label: "뷰티", link: "#" },
        { label: "아울렛", link: "#" }
    ];

    const subCategories = [
        { label: "랭킹", link: "#" },
        { label: "브랜드", link: "#" },
        { label: "매거진", link: "#" },
        { label: "기획전", link: "#" },
        { label: "이벤트", link: "#" }
    ];

    const specialLinks = [
        { label: "회원가입", link: "/signup" },
        { label: "삼성전자", link: "#" }
    ];

    // 로그인 상태 관리
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isGuest, setIsGuest] = useState(false);

    // 토큰 확인해서 비회원 여부 판단
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsGuest(token?.startsWith("guest_token_")); // guest_token_으로 시작하면 true
    }, [isLoggedIn]);

    // 로그인/로그아웃 처리
    const handleLoginToggle = () => {
        if (isLoggedIn) { // Logout 버튼 클릭!!
            const select = window.confirm("정말로 로그아웃 하시겠습니까?");
            if (select) {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setIsGuest(false); // 비회원 여부 초기화
                
                // 상태 업데이트 후 메인 페이지 이동
                setTimeout(() => {
                    navigate('/');
                }, 0);
            }
        } else { // 로그인 버튼 클릭
            navigate('/login');
        }
    };

    return (
        <header className='wrap-header'>
            <div className='header-top-wrap'>
                <ul className='header-top content-wrap'>
                    <Link to='/person' className="person">마이페이지</Link>
                    {/* 비회원 여부에 따라 로그인 버튼 텍스트 변경 */}
                    <Link to='/login' className="login" onClick={handleLoginToggle}>
                        {isLoggedIn ? (isGuest ? "(비회원) 로그아웃" : "로그아웃") : "로그인"}
                    </Link>
                </ul>
            </div>

            <div className='header-middle-wrap'>
                <div className='header-middle content-wrap'>
                    <Link to='/' className='header-logo'><h1><span className="big-logo">SSF</span> <span className="small-logo">SHOP</span></h1></Link>

                    <div className='icon-shop-wrap'>
                        <div className='icon-wrap'>
                            <Link to='/detail'><button type='button'><CiSearch /></button></Link>
                            <Link to='/carts'><button type='button'><CiHeart /></button></Link>
                            <Link to='/carts'><button type='button'><AiOutlineShopping /></button></Link>
                        </div>
                        <span>|</span>
                        <div className='shop-wrap'>
                            <a href='#'>site1</a>
                            <a href='#'>site2</a>
                            <a href='#'>site3</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='header-bottom-wrap content-wrap'>
                <Nav categories={categories} subCategories={subCategories} specialLinks={specialLinks}></Nav>
            </div>
        </header>
    );
}
