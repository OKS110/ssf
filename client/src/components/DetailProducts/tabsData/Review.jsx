export default function Review(){
    return (
        <div style={{backgroundColor:"lightblue" , height:"auto"}}>
            <div class="review-benefit" id="reviewCnnr"><p class="tit" id="reviewCnnrTit">상품리뷰 작성하고 최대 4500C 받으세요!</p>
				<span class="txt">할인 및 쿠폰 적용 후 결제금액 5,000원 이상인 상품리뷰에 한하여 지급</span>
			</div>
            
            <div class="review-chart">
				<div class="satisfaction">
					<span class="rate point5">
						<i aria-label="star"></i><i aria-label="star"></i><i aria-label="star"></i><i aria-label="star"></i><i aria-label="star"></i>
					</span>

					<span class="score">
						<em>
						5.0</em>/5
					</span>
				</div>
				<div class="review-stats">
					<div class="stats-item">
							<span class="tit">컬러</span>
							<div class="lists">
								<ul>
									<li>
										<span class="txt">어두워요</span>
										<span class="bar"><span class="fill"
                                         style={{"width":"0%"}}></span></span>
										<span class="percent"><em>0</em>%</span>
									</li>
									<li>
										<span class="txt">화면과 같아요</span>
										<span class="bar"><span class="fill" style={{"width":"100%"}}></span></span>
										<span class="percent"><em>100</em>%</span>
									</li>
									<li>
										<span class="txt">밝아요</span>
										<span class="bar"><span class="fill" style={{"width":"0%"}}></span></span>
										<span class="percent"><em>0</em>%</span>
									</li>
									</ul>
							</div>
						</div>
					<div class="stats-item">
							<span class="tit">사이즈</span>
							<div class="lists">
								<ul>
									<li>
										<span class="txt">작아요</span>
										<span class="bar"><span class="fill" style={{"width":"0%"}}></span></span>
										<span class="percent"><em>0</em>%</span>
									</li>
									<li>
										<span class="txt">잘 맞아요</span>
										<span class="bar"><span class="fill" style={{"width":"100%"}}></span></span>
										<span class="percent"><em>100</em>%</span>
									</li>
									<li>
										<span class="txt">커요</span>
										<span class="bar"><span class="fill" style={{"width":"0%"}}></span></span>
										<span class="percent"><em>0</em>%</span>
									</li>
									</ul>
							</div>
						</div>
					<div class="stats-item">
							<span class="tit">핏</span>
							<div class="lists">
								<ul>
									<li>
										<span class="txt">슬림핏</span>
										<span class="bar"><span class="fill" style={{"width":"0%"}}></span></span>
										<span class="percent"><em>0</em>%</span>
									</li>
									<li>
										<span class="txt">정사이즈</span>
										<span class="bar"><span class="fill" style={{"width":"0%"}}></span></span>
										<span class="percent"><em>0</em>%</span>
									</li>
									<li>
										<span class="txt">오버핏</span>
										<span class="bar"><span class="fill" style={{"width":"100%"}}></span></span>
										<span class="percent"><em>100</em>%</span>
									</li>
									</ul>
							</div>
						</div>
					</div>
			</div>

            <div class="gods-bx-wrap" id="searchGoodsReviewListCond">
				<div class="bx-top">
					<h3>상품리뷰 <em>(1)</em></h3>
				</div>
				<div class="gods-review-area">
					<div class="tab-navs" role="listbox">
						<ul id="goodsReviewFilterTab">
							<li aria-selected="true" data-filter-tab-flag=""><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">전체</a></li>
							<li aria-selected="false" data-filter-tab-flag="I"><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">포토리뷰</a></li>
							<li aria-selected="false" data-filter-tab-flag="A"><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">도움리뷰</a></li>
							<li aria-selected="false" data-filter-tab-flag="E"><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">스태프 PICK</a></li>
							<li aria-selected="false" data-filter-tab-flag="F"><a href="javascript:void(0);" onclick="goodsReviewFilterTabAction(this);">매장구매</a></li>
						</ul>
					</div>
					<div class="list-leadin opt-check">
						<ul class="lineUp" aria-label="리스트 정렬방식" id="goodsReviewSortTab">
							<li class="selected"><label><input type="radio" onchange="getReviewListSort(this);" name="lineup" value="best" checked=""/>베스트순</label></li>
							<li><label><input type="radio" onchange="getReviewListSort(this);" name="lineup" value="lately"/>최근 등록순</label></li>
							<li><label><input type="radio" onchange="getReviewListSort(this);" name="lineup" value="top"/>평점 높은순</label></li>
							<li><label><input type="radio" onchange="getReviewListSort(this);" name="lineup" value="low"/>평점 낮은순</label></li>
						</ul>

						<div class="filtering" data-type="REVW_PANTS">
							<ul role="tablist" class="tablist" aria-label="필터항목">
								<li role="tab" aria-controls="filter-option" aria-selected="false"><span>상품옵션</span></li>
								<li role="tab" aria-controls="filter-weight" aria-selected="false"><span>신체사이즈</span></li>
								<li role="tab" aria-controls="filter-size" aria-selected="false"><span>평소사이즈</span></li>
								</ul>

							<div role="tabpanel" id="filter-option" aria-hidden="true">
								<div class="inner">
									<strong>색상</strong>
									<ul class="color-list">
										<li>
													<span class="checkbox">
														<input type="checkbox" name="reviewFilterColor" data-txt="남색" data-color="color28" id="color_0" value="R"/>
														<label for="color_0" class="color28" aria-label="남색"></label>
													</span>
												</li>
											</ul>
								</div>
								<div class="inner">
									<strong>사이즈</strong>
									<ul class="list">
										<li><span class="checkbox">
													<input type="checkbox" name="reviewFilterSize" data-txt="M" id="size_0" value="M"/>
													<label for="size_0"><i></i>M</label></span>
												</li>
											</ul>
								</div>
								</div>
							<div role="tabpanel" id="filter-weight" aria-hidden="true">
								<div class="inner">
										<strong>키</strong>
										<ul class="list">
											<li><span class="checkbox">
													<input type="checkbox" data-txt="키 160~164cm" name="reviewFilterHeight" id="height_0" value="160~164"/>
													<label for="height_0"><i></i>160~164cm</label></span>
												</li>
											</ul>
									</div>
								<div class="inner">
										<strong>몸무게</strong>
										<ul class="list">
											<li><span class="checkbox">
													<input type="checkbox" data-txt="몸무게 50~54kg" name="reviewFilterWeight" id="weight_0" value="50~54"/>
													<label for="weight_0"><i></i>50~54kg</label></span>
												</li>
											</ul>
									</div>
								</div>
							<div role="tabpanel" id="filter-size" aria-hidden="true">
								<div class="inner" id="usldaySizeFilterDivPants">
										<strong>평소사이즈</strong>
										<ul class="list">
											<li>
													<span class="checkbox">
														<input type="checkbox" name="reviewFilterPantsUsldaySize" data-txt="평소사이즈 26" id="usldayPantsSize_0" value="PANTS_26"/>
														<label for="usldayPantsSize_0"><i></i>26</label>
													</span>
												</li>
											</ul>
									</div>
								</div>
							{/* <!--선택된 항목--> */}
							<div class="selected" style={{"display": "none"}}>
								<ul title="선택된 필터조건" id="reviewFilterChkList"></ul>
								<button type="button" onclick="reviewFilterClear();" class="reset" aria-label="초기화"></button>
							</div>
							{/* <!--//선택된 항목--> */}
						</div>
					</div>

					<div class="review-detail-lists" id="searchGoodsReviewList">
						<ul>
							<li id="reviewLi_GM0025011713430_1" data-godno="GM0025011713430" data-seq="1" data-inflow-ord-sect-cd="OFLNE_ORD">
								<div class="list-status">
									<span class="rate point5">
									<i aria-label="star"></i><i aria-label="star"></i><i aria-label="star"></i><i aria-label="star"></i><i aria-label="star"></i>
									</span>

								</div>
								<div class="list-content">
									<div class="badge"><span>매장구매</span></div>
									<div class="pick-opts">
										<span>
													<em>색상:</em>&nbsp;<em>남색 (화면과 같아요)</em>
												</span>
											<span>
													<em>사이즈:</em>&nbsp;<em>M (잘 맞아요,오버핏)</em>
												</span>
											<span>
													<em>평소 사이즈:</em>&nbsp;<em>26 (160cm / 51kg)</em>
												</span>
											<span>
													<em>길이:</em>&nbsp;<em>종아리</em>
												</span>
											</div>

									<div class="review-contents single">

										<p class="review-block"><a href="javascript:void(0);" class="txt-view" onclick="reviewSttemntOpenLayer('1', 'GM0025011713430', 'MB202204184969391', 'false',''); return false;">신고/차단</a>
											</p>
										<p class="review-txts">
											봄까지 너무 잘 입을 디자인이에요 심플한데 예뻐요</p>
										</div>
								</div>
								<span class="list-id">
									par*********@gmail.com</span>
								<span class="list-date">2025.02.27</span>
							</li>
							</ul>

						<div class="page">
							<a class="on" href="#none">1</a>
									</div>

					</div>
				</div>
			</div>

            
        </div>
    );
}