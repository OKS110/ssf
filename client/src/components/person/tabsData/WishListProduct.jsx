
export default function WishListProduct() {

    const tabList = [
        { tabName: "코트" },
        { tabName: "스웨터" },
        { tabName: "티셔츠" },
        { tabName: "블라우스" },
        { tabName: "셔츠" },
        { tabName: "니트" },
        { tabName: "청바지" },
        { tabName: "슬랙스" },
    ];



    //className="mypage-wishList-products grid  얘 클래스명 grid 로 해놨는데 바꾸고 나서 css 가서 그리드로 바꿔야할듯 마이페이지에서도쓰고 위시리스트에서도 쓰니까 5개까지한줄에나오게하고
    /// 마이페이지에서 넘치는부분은 오버플로우히든으로하고 위시리스트에서는 전체 다 나오게 

    return (
        <>
            {/* {notMypage &&
                <>
                    <div>
                        <div className="mypage-wishList-products-category ">
                            <ul className='sub-category-select'>
                                {tabList && tabList.map((list) =>
                                    <li className={list.tabName === subCategory ? 'sub-category-select-click-tabMenu' : 'sub-category-select-tabMenu'}
                                        onClick={() => setSubCategory(list.tabName)}>
                                        {list.tabName}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="mypage-wishList-products grid">
                        {pidItem2.map((pidItem, i) =>
                            i < index &&
                            (<div className="mypage-wishList-products-box">
                                <img src={pidItem.img} alt='상품이미지' />
                                    <span className="mypage-wishList-products-heart"
                                        onClick={handleDeleteLike}>
                                        <IoMdHeart />
                                    </span> 
                                <h5>{pidItem.brand}</h5>
                                <p>{pidItem.title}</p>
                                <h4>{pidItem.costprice}</h4>
                                <span>{pidItem.discount}%</span>
                                <span>{pidItem.saleprice}</span>
                            </div>)
                        )}
                    </div>
                </>
            }
            {!notMypage &&
                <div className="mypage-wishList-products">
                    {pidItem2.map((pidItem, i) =>
                        i < index && index < 5 &&
                        (<div className="mypage-wishList-products-box">
                            <img src={pidItem.img} alt='상품이미지' />
                            <h5>{pidItem.brand}</h5>
                            <p>{pidItem.title}</p>
                            <h4>{pidItem.costprice}</h4>
                            <span>{pidItem.discount}%</span>
                            <span>{pidItem.saleprice}</span>
                        </div>)
                    )}
                </div>
            } */}
        </>
    );
}