import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineCardMembership } from "react-icons/md";
import PersonUIform from "../components/person/PersonUIform.jsx";
import axios from "axios";
import { CustomersContext } from '../context/CustomersContext.js';
import { useCustomers } from '../hooks/useCustomers.js';
import { MypageContext } from "../context/MypageContext.js";

export default function Person() {
    // ✅ LocalStorage에서 user_id 가져오기
    const userId = localStorage.getItem("user_id");

    const [heart, setHeart] = useState(false);
    const { customer } = useContext(CustomersContext);
    const { getCustomer } = useCustomers();
    const { setNotMypage } = useContext(MypageContext);

    // 주문 목록 상태 추가
    const [orderList, setOrderList] = useState([]);
    const [isGuest, setIsGuest] = useState(false);

    // 리뷰
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reviewText, setReviewText] = useState(""); // 리뷰 내용
    const [rating, setRating] = useState(5); // ⭐ 기본 별점 5점
    

        /** ✅ 리뷰 작성 버튼 클릭 시 모달 열기 */
        const openReviewModal = (order) => {
            setSelectedOrder(order); // 선택한 주문 정보 저장
            setReviewModalOpen(true);
            setRating(5); // 기본 별점 5점으로 설정
            setReviewText(""); // 리뷰 내용 초기화
        };
        
    /** ✅ 리뷰 모달 닫기 */
    const closeReviewModal = () => {
        setReviewModalOpen(false);
        setReviewText(""); // 입력 필드 초기화
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (token && token.startsWith("guest_token_")) {
                setIsGuest(true);
                const guestId = localStorage.getItem("guest_id");

                if (guestId) {
                    await fetchGuestOrders(guestId);
                } else {
                    console.warn("❌ guest_id가 localStorage에 없습니다.");
                }
            } else {
                setIsGuest(false);
                const userId = localStorage.getItem("user_id");

                if (userId) {
                    await getCustomer(userId);
                    await fetchMemberOrders(userId);
                } else {
                    console.warn("❌ user_id가 localStorage에 없습니다.");
                }
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        setNotMypage(false);
    }, []);

    /** ✅ 비회원 주문 목록 가져오기 */
    const fetchGuestOrders = async (guestId) => {
        try {
            const response = await axios.post("http://localhost:9000/guest/orders", { guest_id: guestId });
            setOrderList(response.data);
        } catch (error) {
            console.error("❌ 비회원 주문 조회 오류:", error);
        }
    };

    /** ✅ 회원 주문 목록 가져오기 */
    const fetchMemberOrders = async (userId) => {
        try {
            const response = await axios.post("http://localhost:9000/order/all", { id: userId });
            setOrderList(response.data);
        } catch (error) {
            console.error("❌ 회원 주문 조회 오류:", error);
        }
    };
    
    console.log("orderList", orderList);
    

    const handleCancelOrder = async (oid) => {
        if (!window.confirm("정말로 주문을 취소하시겠습니까?")) return;
    
        // ✅ UI에서 먼저 해당 주문 제거
        setOrderList((prevOrders) => prevOrders.filter((order) => order.oid !== oid));
    
        try {
            const response = await axios.delete(`http://localhost:9000/order/cancel/${oid}`);
            console.log("✅ 주문 취소 응답:", response.data);
            alert("주문이 취소되었습니다.");
        } catch (error) {
            console.error("❌ 주문 취소 오류:", error.response ? error.response.data : error);
            alert("주문 취소에 실패했습니다.");
    
            // ❌ 오류 발생 시 UI 복구 (취소된 주문 다시 추가)
            setOrderList((prevOrders) => [...prevOrders, orderList.find((order) => order.oid === oid)]);
        }
    };
    
    console.log("selectedOrder", selectedOrder);
    
    // 리뷰 서버에 전달
    const submitReview = async () => {
        if (!reviewText.trim()) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }
        if (!selectedOrder.customer_id || !selectedOrder.product_id || !selectedOrder.oid) {
            console.error("❌ 필수 값 누락: ", {
                customer_id: selectedOrder.customer_id,
                product_id: selectedOrder.product_id,
                order_id: selectedOrder.oid,
            });
            alert("리뷰를 저장할 수 없습니다. (필수 값 누락)");
            return;
        }
        try {
            // ✅ 리뷰 저장 요청
            const response = await axios.post("http://localhost:9000/review/add", {
                customer_id: selectedOrder.customer_id,
                product_id: selectedOrder.product_id,
                order_id: selectedOrder.oid,
                rating: rating,
                review_text: reviewText,
                status: selectedOrder.status
            });
    
            if (response.data.success) {
                alert("리뷰가 등록되었고, 주문 상태가 업데이트되었습니다.");
    
                // ✅ 주문 리스트에서 상태 업데이트
                setOrderList((prevOrders) =>
                    prevOrders.map(order =>
                        order.oid === selectedOrder.oid ? { ...order, status: "Reviewed" } : order
                    )
                );
                closeReviewModal();
            }
        } catch (error) {
            console.error("❌ 리뷰 저장 오류:", error);
            alert("리뷰 등록에 실패했습니다.");
        }
    };
    
    

    return (
        <div className="mypage-box">
            <div className="mypage-top-menu">
                <span>Home</span>
                <SlArrowRight className="mypage-top-menu-icon" />
                <span><Link to='/person' className='mypage-link'>마이페이지</Link></span>
            </div>
            <div className="mypage-top-box-flex">
                <div className="mypage-top-box-empty"></div>
                <div className="mypage-top-box">마이페이지</div>
            </div>
            <div className="mypage-bottom-box">
                <PersonUIform />
                <article className="mypage-bottom-right">
                    <div className="mypage-bottom-my">
                        <div className="mypage-bottom-my-top">
                            <div className="mypage-bottom-my-top-left">
                                <span><MdOutlineCardMembership /></span>
                                <span>{customer?.name}님</span>
                                <span><SlArrowRight /></span>
                            </div>
                        </div>
                    </div>

                    {/* ✅ 최근 주문 상품 표시 (테이블 형태) */}
                    <div className="mypage-order-product">
                        <div className="mypage-order-product-top">
                            <h2>최근 주문 상품</h2>
                            <div>
                                <span>더보기</span>
                                <span><MdKeyboardArrowRight /></span>
                            </div>
                        </div>

                        <div className="mypage-order-product-bottom">
                            {orderList.length === 0 ? (
                                <span>최근 주문 내역이 없습니다. 마음에 드는 상품을 찾아보세요.</span>
                            ) : (
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th>이미지</th>
                                            <th>상품명</th>
                                            <th>색상</th>
                                            <th>사이즈</th>
                                            <th>수량</th>
                                            <th>총 가격</th>
                                            <th>배송 상태</th>
                                            {userId && <th></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderList.map((order, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img 
                                                        src={order.image || "/default-image.jpg"} 
                                                        alt={order.title} 
                                                        className="order-img"
                                                    />
                                                </td>
                                                <td>{order.brand} - {order.title}</td>
                                                <td>{order.color}</td>
                                                <td>{order.size}</td>
                                                <td>{order.quantity}개</td>
                                                <td>{order.total_price.toLocaleString()}원</td>
                                                <td className={`status-${order.status.toLowerCase()}`}>
                                                    {order.status === "Pending" ? "배송중" : 
                                                    order.status === "Delivered" || "Reviewed" ? "배송 완료" : ""}
                                                </td>
                                                {userId && 
                                                <td>
                                                    {/* ✅ 주문 상태가 "Delivered"일 경우 */}
                                                        {order.status === "Reviewed" ? (
                                                            <span className="review-done">리뷰 완료</span>
                                                        ) : order.status === "Delivered" ? (
                                                            <button className="review-btn" onClick={() => openReviewModal(order)}>리뷰 작성</button>
                                                        ) : (
                                                            <button className="cancel-btn" onClick={() => handleCancelOrder(order.oid)}>취소</button>
                                                        )}

                                                </td>}
                                                

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            )}
                            <div>
                                <Link className="mypage-order-product-bottom-shop" to='/'>
                                    <span>쇼핑하기<MdKeyboardArrowRight /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            {/* ✅ 리뷰 작성 모달 */}
                {userId && reviewModalOpen && (
                    <div className="review-modal">
                        <div className="modal-content">
                            <h2>리뷰 작성</h2>
                            <p>{selectedOrder?.brand} - {selectedOrder?.title}</p>

                            {/* ⭐ 별점 선택 추가 */}
                            <div className="rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={star <= rating ? "star selected" : "star"}
                                        onClick={() => setRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            <textarea 
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="리뷰를 작성해주세요..."
                            />

                            <div className="modal-actions">
                                <button className="submit-review" onClick={submitReview}>등록</button>
                                <button className="close-modal" onClick={closeReviewModal}>취소</button>
                            </div>
                        </div>
                    </div>
                )}
        </div>

        
    );
}
