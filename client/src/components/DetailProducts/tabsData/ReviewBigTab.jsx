export default function ReviewBigTab() {
return (
    <ul id="goodsReviewFilterTab">
        <li aria-selected="true" data-filter-tab-flag=""><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">전체</a></li>
        <li aria-selected="false" data-filter-tab-flag="I"><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">포토리뷰</a></li>
        <li aria-selected="false" data-filter-tab-flag="A"><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">도움리뷰</a></li>
        <li aria-selected="false" data-filter-tab-flag="E"><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">스태프 PICK</a></li>
        <li aria-selected="false" data-filter-tab-flag="F"><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">매장구매</a></li>
    </ul>
    );
};