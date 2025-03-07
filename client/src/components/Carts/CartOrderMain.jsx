import Button from "../../commons/Button";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext.js";
import { DetailProductContext } from "../../context/DetailProductContext";
import { useCart } from "../../hooks/useCart.js";
import { useProduct } from "../../hooks/useProduct.js";
import Modal from 'react-modal';
import CartOptionModal from "./CartOptionModal.jsx";
import { IoIosClose } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function CartOrderMain() {
    const { isLoggedIn } = useContext(AuthContext);
    const { cartList, userId } = useContext(DetailProductContext);
    const { getCartItems, cartDeleteItem, getGuestCartItems } = useCart();
    const { getPidItem } = useProduct();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);  // 선택된 상품 저장용
    const [guestCartList, setGuestCartList] = useState([]); // 비회원 장바구니 저장


    useEffect(() => {
        if (isLoggedIn) {
            getCartItems();
        } else {
            const guestCart = JSON.parse(localStorage.getItem("guest_cart"));
            console.log("guestCart --> ", guestCart);
            // setGuestCartList(guestCart);

            const productPids = guestCart && guestCart.map((product) => product.pid);

            getProductData(productPids, guestCart);

        }
    }, []);
    
    const getProductData = async(productPids, guestCart) => {
        const productData = await getGuestCartItems(productPids);
        console.log("productsData --> ", productData.data);
        // const updateCartList = guestCart.map((item) => {});
    }

    // 모달창 스타일 설청
    const customModalStyles = {
        overlay: {
            backGroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: "40",
            // position: "fixed",
            top: "0",
            left: "0"
        },
        content: {
            width: "400px",
            height: "400px",
            zIndex: "41",
            top: "20%",
            left: "0",
            justifyContent: "center",
        }
    }

    const openModal = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    }

    // 삭제 버튼 이벤트
    const deleteItem = (cid) => {
        const select = window.confirm("선택한 상품을 삭제하시겠습니까?");
        if (isLoggedIn) {
            select && cartDeleteItem(cid);
            getCartItems();
        } else {

        }
    }
    
    return (
        <>
            {
                isLoggedIn ? (
                    cartList.length > 0 ? (
                        <table>
                            <colgroup>
                                <col width="40"></col>
                                <col width="124"></col>
                                <col width="*"></col>
                                <col width="180"></col>
                                <col width="220"></col>
                            </colgroup>
                            <thead>
                                <tr className="thead">
                                    <th colspan="3" scope="col">상품·혜택 정보</th>
                                    <th scope="col">배송정보</th>
                                    <th scope="col">주문금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((item) =>
                                    <tr>
                                        <td>
                                            <label title="[三無衣服] 스트레치 방한 슬랙스 - 네이비 선택">
                                                <input type="checkbox" name="check" id="1" /><i></i>
                                            </label>
                                        </td>

                                        <td>
                                            <a className="list_goods" href="#">
                                                <img src={item.image}
                                                    onError={(e) => e.target.src = '/v3/images/common/noImg_60.gif'} alt="" />
                                                <div className="keep">
                                                    <span view-godno="GM0024090410257" view-godturn="1" className="heart on">
                                                        <input type="radio" className="dummy on" title="찜하기" />
                                                    </span>
                                                </div>
                                            </a>
                                        </td>

                                        <td style={{ textAlign: "left" }}>
                                            <div className="badge"></div>

                                            <div className="info">
                                                <span className="brand">{item.brand}</span>

                                                <span className="name">
                                                    <a href="#">{item.name}</a>
                                                </span>

                                                <div className="selected_options">
                                                    <ul>
                                                        <li>
                                                            색상: {item.color} / 사이즈: {item.size} / {item.quantity}개
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="alter">
                                                    <button onClick={() => openModal(item)}>옵션/수량변경</button>
                                                    <Modal
                                                        isOpen={isOpen}
                                                        onRequestClose={() => setIsOpen(false)}
                                                        ariaHideApp={false}
                                                        contentLabel="Pop up Message"
                                                        shouldCloseOnOverlayClick={true}
                                                        style={customModalStyles}
                                                    >
                                                        <CartOptionModal item={selectedItem} event={setIsOpen} />
                                                    </Modal>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="shipping">
                                                <span className="cost" id="dlvCostView1">무료배송</span>
                                            </div>
                                        </td>

                                        <td>
                                            <a className="delete" onClick={() => deleteItem(item.cid)}><IoIosClose /></a>
                                            <div className="price">
                                                <del>{item.original_price}원</del>
                                                <span>
                                                    {item.discounted_price}원
                                                    <em>{item.discount_rate}%</em>
                                                </span>
                                            </div>
                                            <div className="fulfill">
                                                <Button className="bk" title="바로구매"></Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    ) : (
                        <div className="nothing-cart-item">
                            {/* <img src="/image/shopping-bag.png" alt="" style={{width: "100px", color: "silver"}} /> */}
                            <HiOutlineShoppingBag style={{fontSize: "130px", color: "silver"}} />
                            <p>장바구니에 담긴 상품이 없습니다.</p>
                        </div>
                    )
                ) : (
                    guestCartList.length > 0 ? (
                        <table>
                            <colgroup>
                                <col width="40"></col>
                                <col width="124"></col>
                                <col width="*"></col>
                                <col width="180"></col>
                                <col width="220"></col>
                            </colgroup>
                            <thead>
                                <tr className="thead">
                                    <th colspan="3" scope="col">상품·혜택 정보</th>
                                    <th scope="col">배송정보</th>
                                    <th scope="col">주문금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guestCartList.map((item) =>
                                    <tr>
                                        <td>
                                            <label title="[三無衣服] 스트레치 방한 슬랙스 - 네이비 선택">
                                                <input type="checkbox" name="check" id="1" /><i></i>
                                            </label>
                                        </td>

                                        <td>
                                            <a className="list_goods" href="#">
                                                <img src={item.image}
                                                    onError={(e) => e.target.src = '/v3/images/common/noImg_60.gif'} alt="" />
                                                <div className="keep">
                                                    <span view-godno="GM0024090410257" view-godturn="1" className="heart on">
                                                        <input type="radio" className="dummy on" title="찜하기" />
                                                    </span>
                                                </div>
                                            </a>
                                        </td>

                                        <td style={{ textAlign: "left" }}>
                                            <div className="badge"></div>

                                            <div className="info">
                                                <span className="brand">{item.brand}</span>

                                                <span className="name">
                                                    <a href="#">{item.name}</a>
                                                </span>

                                                <div className="selected_options">
                                                    <ul>
                                                        <li>
                                                            색상: {item.color} / 사이즈: {item.size} / {item.quantity}개
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="alter">
                                                    <button onClick={() => openModal(item)}>옵션/수량변경</button>
                                                    <Modal
                                                        isOpen={isOpen}
                                                        onRequestClose={() => setIsOpen(false)}
                                                        ariaHideApp={false}
                                                        contentLabel="Pop up Message"
                                                        shouldCloseOnOverlayClick={true}
                                                        style={customModalStyles}
                                                    >
                                                        <CartOptionModal item={selectedItem} event={setIsOpen} />
                                                    </Modal>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="shipping">
                                                <span className="cost" id="dlvCostView1">무료배송</span>
                                            </div>
                                        </td>

                                        <td>
                                            <a className="delete" onClick={() => deleteItem(item.cid)}><IoIosClose /></a>
                                            <div className="price">
                                                <del>{item.original_price}원</del>
                                                <span>
                                                    {item.discounted_price}원
                                                    <em>{item.discount_rate}%</em>
                                                </span>
                                            </div>
                                            <div className="fulfill">
                                                <Button className="bk" title="바로구매"></Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    ) : (
                        <div className="nothing-cart-item">
                            {/* <img src="/image/shopping-bag.png" alt="" style={{width: "100px", color: "silver"}} /> */}
                            <HiOutlineShoppingBag style={{fontSize: "130px", color: "silver"}} />
                            <p>장바구니에 담긴 상품이 없습니다.</p>
                        </div>
                    )
                )
            }
        </>
    );
}

/** 진행 상황
 * 비회원일 때 localStorage 사용해서 카트리스트 배열 만드는 건 완료
 * 조건 처리 수정 필요(토큰여부)
 * 비회원일 때 카트리스트 상품들의 정보(이미지, 상품명, 가격) 호출하기
 */ 