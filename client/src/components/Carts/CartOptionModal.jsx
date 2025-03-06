import React, { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useCart } from "../../hooks/useCart"
import Button from '../../commons/Button';

export default function CartOptionModal({item, event}) {
    const { changeQty } = useCart();
    const [count, setCount] = useState(item.quantity);

    // const data = item; 
    console.log("item --> ", item);
    // console.log("count --> ", count);

    // 수량변경 버튼 이벤트
    const handleQty = (type) => {
        type === "increase"
        ? setCount(count + 1)
        : setCount(count - 1);
    }

    // 변경하기 버튼 이벤트
    const onChange = () => {
        count > 0 && changeQty(item.cid, count);
        event(false);
    }

    return (
        <div className='cartModal-change-wrap'>
            <div className='cartModal-change-header'>
                <span>옵션/수량 변경</span>
                <span onClick={() => event(false)}><IoIosClose /></span>
            </div>
            <div className='cartModal-change-info'>
                <p>{item.name}</p>
                <p>FREE / {item.quantity}개</p>
            </div>
            <ul className='cartModal-change-options'>
                <li className='cartModal-change-size'>
                    <label>사이즈</label>
                    <select>
                        <option value="small">S</option>
                        <option value="medium">M</option>
                        <option value="large">L</option>
                    </select>
                </li>
                <li className='cartModal-change-size'>
                    <label>색상</label>
                    <select>
                        <option value="black">black</option>
                        <option value="white">white</option>
                    </select>
                </li>
                <li className='cartModal-change-qty'>
                    <label>수량</label>
                    <div>
                        <button onClick={() => handleQty("decrease")}><FaMinus /></button>
                        <span>{count}</span>
                        <button onClick={() => handleQty("increase")}><FaPlus /></button>
                    </div>
                </li>
            </ul>
            {/* <Button className="cartModal-change-btn" title="변경하기" /> */}
            <button className="cartModal-change-btn"
                    onClick={onChange}
            >
                변경하기
            </button>
        </div>
    );
}