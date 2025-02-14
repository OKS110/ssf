import GuestLogin from "../components/Logins/GuestLogin.jsx";

export default function Order() {
return (
    <section id = "order" className="content-wrap content-wrap-padding">
        <h1>주문/결제</h1>

        <table class="grid_wrap goods" style={{backgroundColor:"yellow"}}>
            <caption>결제페이지 상품 정보</caption>

            <colgroup>
                <col width="124"></col>
                <col width="*"></col>
                <col width="200"></col>
                <col width="200"></col>
                <col width="180"></col>
            </colgroup>
            <tbody class="all-group">
                <tr>
                    <th colspan="2" scope="col">상품정보</th>
                    <th scope="col">할인/혜택</th>
                    <th scope="col">
                        배송 정보</th>
                    <th scope="col">주문금액</th>
                </tr>
                <tr>
                    <td>상품 정보 이미지</td>
                    <td>상품 정보</td>
                    <td>할인/혜택</td>
                    <td>배송정보</td>
                    <td>주문금액</td>
                </tr>
                

            </tbody>
	    </table>
        <GuestLogin></GuestLogin>
    </section>

    );
};