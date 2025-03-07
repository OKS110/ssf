import { MdKeyboardArrowRight } from "react-icons/md";


export default function WishListContent(){
    return (
        <div className="mypage-wishList-brandContent-box">
            <div>저장된 관심 기획전이 없습니다. 최신 기획전에서 관심 기획전을 찾아보세요.</div>
            <button>
                <span>찾아보기</span>
                <span><MdKeyboardArrowRight /></span>
            </button>
        </div>
    );
}