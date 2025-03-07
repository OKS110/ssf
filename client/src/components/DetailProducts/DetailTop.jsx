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
import axios from 'axios';
import { useMypage } from "../../hooks/useMypage.js";
import { MypageContext } from "../../context/MypageContext.js";
import WishListProduct from "../person/tabsData/WishListProduct.jsx";

export default function DetailTop({ pidItem, pid }) {
    const { isLoggedIn } = useContext(AuthContext);
    const { getCid, favoriteAllData } = useMypage();
    const { cid, allLike } = useContext(MypageContext);
    const [isHover, setIsHover] = useState(true);
    const [heactClick, setHeartClick] = useState(false);
    const handleEnter = () => {setIsHover(false)}       
    const handleLeave = () => {setIsHover(true)}  
    
    // useEffect(() => {
    //     const fetchCustoerList = async () => {
    //         await getCid();
    //     }
    //     fetchCustoerList();
    // }, [])
    // // console.log('cid=================',cid);  
    // useEffect(() => {
    //     const fetchCustoerList = async () => {
    //         await favoriteAllData();
    //     }
    //     fetchCustoerList();
    // }, [cid])
    // // console.log('==================',allLike);
    
    // useEffect(()=>{
    //     const pLists = allLike.map((item)=>item.product_id);  
    //     // console.log('==================',pLists);
    //     // console.log('================== pid:', pid, '타입:', typeof pid);
    //     const ok = pLists.includes(Number(pid))
    //     if(ok === true){
    //         setHeartClick(true);
    //         localStorage.setItem('heart',JSON.stringify(pLists));
    //     }else {
    //         setHeartClick(false);
    //     }
    //     // console.log('=======ddd===========',ok);
    // },[allLike]) ;
    
    // const handleAddLike =  () => {
    //      axios.post('http://localhost:9000/mypage/addLike', { cid, pid })
    //         .then(setHeartClick(true))                    
    //         .catch(err => console.log(err));
    // }
    // const handleDeleteLike = () => {
    //     axios.post('http://localhost:9000/mypage/deleteLike', { cid, pid })
    //         .then(setHeartClick(false))
    //         .catch(err => console.log(err));
    // }

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
                            {/* {!heactClick && isLoggedIn &&
                                <span onClick={() => { handleAddLike() }}>
                                    <IoMdHeartEmpty />
                                </span>
                            }
                            {heactClick && isLoggedIn &&
                                <span onClick={() => { handleDeleteLike() }}>
                                    <IoMdHeart style={{ color: '#7E00FF' }} />
                                </span>} */}
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