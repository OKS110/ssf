import React, { use, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useProduct } from '../../hooks/useProduct.js';
import { ProductContext } from '../../context/ProductContext.js';

export default function SearchModal({event}) {
    const { productList, searchList, search, setSearch } = useContext(ProductContext);
    const { getSearchList } = useProduct();
    const navigate = useNavigate();

    const [ auto, setAuto ] = useState("");

    useEffect(() => {
        getSearchList(search);
    }, []);
        
    // 검색버튼 클릭시 이벤트
    const onSubmit = () => {
        if (search !== "") {
            localStorage.removeItem("search_key");
            localStorage.setItem("search_key", search);
            event(false); // 모달창 on/off 설정
            getSearchList(search);
            navigate("/searchPage");
        } else {
            alert("검색어를 입력해주세요!");
        }
    }

    // 기준점
    const filter = productList.filter((item) => item.title.toLowerCase().includes(auto.toLowerCase()));

    return (
        <div className='header-search-modal-wrap'>
            <div className='search-modal-off'
            >
                <span onClick={() => event(false)}><IoCloseSharp /></span>
            </div>
            <div className='search-modal-main'>
                <div className='search-modal-main-header'>
                    <input type="text"
                            name="search"
                            placeholder="검색어를 입력하세요"
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setAuto(event.target.value);
                            }}
                    />
                    <span onClick={onSubmit}><IoIosSearch /></span>
                </div>
                <div className='search-modal-box'>
                    {
                        auto
                        ? (
                            filter.length > 0
                            ? (
                                productList && productList.filter((item) => item.title.toLowerCase().includes(auto.toLowerCase()))
                                            .map((item, i) => 
                                                i < 5 &&
                                                <p>{item.title}</p>
                                            )
                            )
                            : (
                                productList && productList.filter((item) => item.category.toLowerCase().includes(auto.toLowerCase()))
                                            .map((item, i) => 
                                                i < 5 &&
                                                <p>{item.title}</p>
                                            )
                            )
                        )
                        : (
                            // <div>
                            //     <span>최근검색어</span>
                            //     <span>전체삭제</span>
                            // </div>
                            []
                        )
                    }
                </div>
            </div>
        </div>
    );
}