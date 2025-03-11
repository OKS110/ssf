import express from 'express';
import mysql from 'mysql2/promise'; // MySQL 연동을 위한 패키지
import cors from 'cors';
import { WebSocketServer } from 'ws';
import loginRouter from './router/loginRouter.js'
import productRouter from './router/productRouter.js';
import SignupRouter from './router/signupRouter.js';
import mypageRouter from './router/mypageRouter.js';
import orderRouter from './router/orderRouter.js';
import paymentRouter from './router/paymentRouter.js';
import customerRouter from './router/customerRouter.js';
import guestRouter from './router/guestRouter.js';
import cartRouter from './router/cartRouter.js';
import deliUploadRouter from './router/deliUploadRouter.js';
import reviewRouter from './router/reviewRouter.js';
import path from 'path'; 

// 서버 생성 및 포트 지정
const server = express();
const port = 9000;

// ✅ CORS 설정 추가 (9001번 포트에서 요청 가능하도록 설정)
server.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // 관리자 페이지에서 요청 가능하도록 허용
    credentials: true
}));

server.use(express.json()); // JSON 요청 처리
// server.use(express.urlencoded()); //form데이터를 express 서버로 전송할 때
server.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

//로그인 폼(유저, 게스트) 
server.use('/user', loginRouter);
server.use('/product', productRouter);

// ✅ 상품 업데이트 요청을 받을 API 추가 (GET, POST 둘 다 처리 가능하게 변경)
server.get('/product/update', (req, res) => {
    console.log("✅ 상품 데이터 업데이트 요청 수신 (GET)");
    res.json({ message: "상품 데이터 업데이트 요청 수신 (GET)" });


});

server.post('/product/update', (req, res) => {
    console.log("✅ 상품 데이터 업데이트 요청 수신 (POST)");
    res.json({ message: "상품 데이터 업데이트 요청 수신 (POST)" });

    
});


server.use('/member', SignupRouter);
// ✅ 고객 서버에서 관리자 서버로 WebSocket 연결
const wsAdmin = new WebSocket('ws://localhost:9002');

wsAdmin.onopen = () => {
    console.log('📡 고객 서버 → 관리자 서버 WebSocket 연결됨');
};

wsAdmin.onerror = (error) => {
    console.error('❌ WebSocket 오류:', error);
};

// ✅ 회원가입 후 관리자에게 실시간 알림 전송
export const notifyAdminNewCustomer = () => {
    if (wsAdmin.readyState === WebSocket.OPEN) {
        console.log("📡 고객 페이지 → 관리자 페이지 WebSocket 메시지 전송 중...");
        wsAdmin.send(JSON.stringify({ type: "new_customer" }));
    } else {
        console.log("❌ WebSocket이 아직 연결되지 않음 (고객 페이지)");
    }
};

server.use('/mypage',mypageRouter);
//  업로드 주소 호출 경로 추가
// server.use('/deliveryUpload',express.static(path.join('deliveryUpload')));   
server.use('/deliveryUploads',deliUploadRouter); 
server.use('/customers', customerRouter);
server.use('/guest', guestRouter);
server.use('/order', orderRouter);
server.use('/payment', paymentRouter);
// 카트
server.use('/cart', cartRouter);

// 리뷰
server.use('/review', reviewRouter);




// 서버 실행
server.listen(port, () => {
    console.log(`고객 서버 실행 중: http://localhost:${port}`);
});




