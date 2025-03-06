import Button from "../../commons/Button";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext.js";
import { DetailProductContext } from "../../context/DetailProductContext";
import { useCart } from "../../hooks/useCart.js";
import Modal from 'react-modal';
import CartOptionModal from "./CartOptionModal.jsx";

export default function CartOrderMain() {
    const { isLoggedIn } = useContext(AuthContext);
    const { cartList, userId } = useContext(DetailProductContext);
    const { getCartItems } = useCart();
    const [ isOpen, setIsOpen ] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);  // 선택된 상품 저장용
    // const id = localStorage.getItem("user_id");
    // console.log("장바구니 페이지 cartList --> ", cartList);

    useEffect(() => {
        if (isLoggedIn) {
            getCartItems();
        }
    }, []);

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

    return (
        <table>
            {/* <caption>장바구니 일반배송</caption> */}
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
                { cartList && cartList.map((item, i) => 
                    <tr id="row1">
                        <td>
                            <label title="[三無衣服] 스트레치 방한 슬랙스 - 네이비 선택">
                                <input type="checkbox" name="check" id="1" /><i></i>
                            </label>
                        </td>

                        <td>
                            <a className="list_goods" href="#">
                                <img src={item.image}
                                    onerror="javascript:this.src='/v3/images/common/noImg_60.gif'" alt="" />
                                <div className="keep">
                                    <span view-godno="GM0024090410257" view-godturn="1" className="heart on">
                                        <input type="radio" className="dummy on" title="찜하기" />
                                    </span>
                                </div>
                            </a>
                        </td>

                        <td style={{ textAlign: "left" }}>
                            <div className="badge">
                            </div>

                            <div className="info">
                                <span className="brand">{item.brand}</span>

                                <span className="name">
                                    <a href="#">{item.name}</a>
                                </span>

                                <div className="selected_options">
                                    <ul>
                                        <li>
                                            남색 / 096 / {item.quantity}개
                                        </li>
                                    </ul>
                                </div>

                                <div className="benefits">
                                    {/* <!-- #137759 [21년 2분기] 사은품 행사 셀링 강화 --> */}
                                </div>
                                <div className="alter">
                                    <a href="#" className="btn" style={{ backgroundColor: "yellowgreen" }}></a>
                                    {/* <Button title="옵션/수량 변경" onClick={() => setIsOpen(true)}></Button> */}
                                    <button onClick={() => openModal(item)}>옵션/수량변경</button>
                                    <Modal
                                        isOpen={isOpen}
                                        onRequestClose={() => setIsOpen(false)}
                                        ariaHideApp={false}
                                        contentLabel="Pop up Message"
                                        shouldCloseOnOverlayClick={true}
                                        style={customModalStyles}
                                    >
                                        <CartOptionModal item={selectedItem} event={setIsOpen}/>
                                    </Modal>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className="shipping">
                                <span className="cost" id="dlvCostView1">무료배송</span>
                                <span></span>
                            </div>
                        </td>

                        <td>
                            <a href="#" className="delete">삭제</a>
                            <div className="price">
                                <del>{item.original_price}원</del>
                                <span>
                                    {item.discounted_price}원
                                    <em>{item.discount_rate}%</em>
                                </span>
                            </div>
                            <div className="fulfill">
                                {/* <a href="#" className="btn bk" style={{backgroundColor:"yellowgreen"}}>바로구매</a> */}
                                <Button className="bk" title="바로구매"></Button>
                            </div>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
}