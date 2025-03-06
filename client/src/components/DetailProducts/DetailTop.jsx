import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useEffect, useState } from "react";
import { SiGitconnected } from "react-icons/si";
import { AuthContext } from "../../auth/AuthContext";
import { useContext } from "react";
import { MypageContext } from '../../context/MypageContext';
import axios from 'axios';
import { useMypage } from "../../hooks/useMypage.js";

export default function DetailTop({ pidItem, pid }) {
    const { isLoggedIn } = useContext(AuthContext);
    // const { allLike, setAllLike } = useContext(MypageContext);
    // const { favoriteAllData } = useMypage();
    const [isHover, setIsHover] = useState(true);
    const [heactClick, setHeartClick] = useState(false);

    const handleEnter = () => {
        setIsHover(false);
    }
    const handleLeave = () => {
        setIsHover(true);
    }

    // console.log('allLike', allLike);

    const id = localStorage.getItem('user_id');
    const handleLike = async () => {
        await axios.post('http://localhost:9000/mypage/getId', { id })
            .then(res => {
                const cid = res.data;
                axios.post('http://localhost:9000/mypage/addLike', { cid, pid })
                    .then(setHeartClick(true))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    const handleDeleteLike = () => {
        axios.post('http://localhost:9000/mypage/getId', { id })
            .then(res => {
                const cid = res.data;
                axios.post('http://localhost:9000/mypage/deleteLike', { cid, pid })
                    .then(setHeartClick(false))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    // 하트누르고 새로고침하면 하트 사라짐 계속 유지되게 해야함
    // useEffect(() => {
    //     // favoriteAllData();
    // }, []);

    // useEffect(() => {
    //     if (allLike && Array.isArray(allLike)) {
    //         setHeartClick(allLike.some(item => item.product_id === pid));
    //     }
    // }, [allLike, pid]);

    return (
        <section className="detail-top-wrap">
            <div aria-label="Breadcrumb" class="breadcrumb">
                <ol>
                    <li><a href="/">Home</a></li>
                    <li>
                        <a href="#none;">{pidItem.category}</a>
                    </li>
                    <li>
                        {pidItem.sub_category}
                    </li>
                </ol>
            </div>

            <div class="detail-top-right">
                {isHover ?
                    (
                        <div className="notover">
                            {!heactClick ? (
                                <span onClick={isLoggedIn ? () => { handleLike() } : null}>
                                    <IoMdHeartEmpty />
                                </span>
                            ) : (<span onClick={() => { handleDeleteLike() }}>
                                <IoMdHeart style={{ color: '#7E00FF' }} />
                            </span>)
                            }
                            <span onMouseEnter={handleEnter}><CiShare2 /></span>
                        </div>
                    ) :
                    (
                        <div onMouseLeave={handleLeave}>
                            <span >
                                <a class="over-facebook" href="#none;" ><FaFacebook /></a>
                                <a class="over-twitter" href="#none;"><FaTwitter /></a>
                                <a class="over-pinterest" href="#none;" ><FaPinterest /></a>
                                <a class="over-url" href="#none;"><SiGitconnected /></a>
                            </span>
                        </div>
                    )
                }
                {/* <div class="layer_clip">
                                <span>URL이 복사되었습니다.</span>  
                            </div> */}
            </div>
        </section>
    );
}