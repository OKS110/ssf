import { MdKeyboardArrowRight } from "react-icons/md";


export default function WishListBrand(){
    return (
        <div className="mypage-wishList-brandContent-box">
            <div>저장된 관심 브랜드가 없습니다. SSF SHOP의 다양한 브랜드 중 관심 브랜드를 찾아보세요.</div>
            <button>
                <span>찾아보기</span>
                <span><MdKeyboardArrowRight /></span>
            </button>
        </div>
    );
}