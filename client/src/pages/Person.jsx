import { MdKeyboardArrowRight } from "react-icons/md";
import { LuMessageSquareMore } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { BiParty } from "react-icons/bi";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineCardMembership } from "react-icons/md";
import { Link } from "react-router-dom";


export default function Person(){
    return (
        <div className="mypage-box">
            <div className="mypage-top-menu">
                <span>Home</span>
                <SlArrowRight className="mypage-top-menu-icon"/>
            <span ><Link to = '/person' className='mypage-link' >마이페이지</Link></span>
            </div>
            <div className="mypage-top-box-flex">
                <div className="mypage-top-box-empty"></div>
                <div  className="mypage-top-box">마이페이지</div>
            </div>
            <div className="mypage-bottom-box">
                <nav className="mypage-bottom-left">
                    <h3>주문관리</h3>
                    <ul>
                        <li><Link to='/person/orderChangeReturnCancle'>주문/교환/반품/취소 내역</Link></li>
                        <li><a href="">매장 구매내역</a></li>
                    </ul>
                    <h3>나의 혜택</h3>
                    <ul>
                        <li><a href="">쿠폰</a></li>
                        <li><a href="">멤버십 포인트</a></li>
                        <li><a href="">퍼플코인</a></li>
                        <li><a href="">기프트 포인트</a></li>
                    </ul>
                    <h3>나의 활동</h3>
                    <ul>
                        <li><a href="">상품리뷰</a></li>
                        <li><a href="">상품Q&A</a></li>
                        <li><a href="">최근 본 상품</a></li>
                        <li><a href="">위시리스트</a></li>
                        <li><a href="">재입고 알림</a></li>
                        <li><a href="">이벤트 참여내역</a></li>
                    </ul>
                    <h3>나의 정보</h3>
                    <ul>
                        <li><Link to='/person/editMemberInfo'>회원정보 관리</Link></li>
                        <li><a href="">마케팅정보 수신 동의</a></li>
                        <li><a href="">배송지 관리</a></li>
                    </ul>
                    <h3>고객센터</h3>
                    <ul>
                        <li><a href="">1:1문의</a></li>
                        <li><a href="">무료 사이즈 수선</a></li>
                        <li><a href="">A/S 수선</a></li>
                    </ul>
                </nav>
                <article className="mypage-bottom-right">
                    <div className="mypage-bottom-my">
                        <div className="mypage-bottom-my-top">   
                            <div className="mypage-bottom-my-top-left">
                                <span><MdOutlineCardMembership /></span>
                                <span>홍길동님</span>
                                <span><SlArrowRight /></span>
                            </div>
                            <div className="mypage-bottom-my-top-right">
                                <span>포인트 사용방법</span>
                                <span><SlArrowRight /></span>
                            </div>
                        </div>
                        <div className="mypage-bottom-my-bottom">
                            <ul>
                                <a href="">
                                    <li>
                                        <span>쿠폰</span>
                                        <h3>5장</h3>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span>멤버십 포인트</span>
                                        <h3>0P</h3>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span>퍼플코인</span>
                                        <h3>0C</h3>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span>기프트 포인트</span>
                                        <h3>0G</h3>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                    <div className="mypage-order-product">
                        <div className="mypage-order-product-top">
                            <h2>최근 주문 상품</h2>
                            <div>
                                <span>더보기</span>
                                <span><MdKeyboardArrowRight /></span>
                            </div>
                        </div>
                        <div className="mypage-order-product-bottom">
                            <span>최근 주문 내역이 없습니다. 마음에드는 상품을 찾아보세요.</span>
                            <div>
                                <Link to ='/'><span>쇼핑하기<MdKeyboardArrowRight /></span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="mypage-wishList" >
                        <div className="mypage-wishList-top" >
                            <h2>위시리스트</h2>
                            <div>
                                <span>더보기</span>
                                <span><MdKeyboardArrowRight /></span>
                            </div>
                        </div>
                        <div className="mypage-wishList-tab" >
                            <ul>
                                <li className="mypage-wishList-tab-active mypage-wishList-tab-none">상품</li>
                                <li className=" mypage-wishList-tab-none">브랜드</li>
                                <li className=" mypage-wishList-tab-none">콘텐츠</li>
                            </ul>
                        </div>
                        <div className="mypage-wishList-items">
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                            <div>
                            아이템 컴포넌트 이거는 언니가 메인화면에 만든거 써랑
                             얘 5개 복붙
                            </div>
                        </div>
                    </div>
                    <div className="mypage-active">
                        <h2>활동내역</h2>
                        <div className="mypage-active-box">
                            <ul>
                                <a href="">
                                    <li>
                                        <span><LuMessageSquareMore /></span>
                                        <span>1:1문의</span>
                                        <span>0건</span>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span><CiEdit /></span>
                                        <span>상품Q&A</span>
                                        <span>0건</span>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span><FaRegBell /></span>
                                        <span>재입고 알림</span>
                                        <span>0건</span>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <span><BiParty /></span>
                                        <span>이벤트 참여내역</span>
                                        <span>0건</span>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}