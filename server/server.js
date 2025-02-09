import express from 'express';
import mysql from 'mysql2/promise'; // MySQL 연동을 위한 패키지
import cors from 'cors';

// 서버 생성 및 포트 지정
const server = express();
const port = 9000;

server.use(cors()); // CORS 설정
server.use(express.json()); // JSON 요청 처리

// MySQL 데이터베이스 연결 설정
const db = mysql.createPool({
    host: 'localhost', // MySQL 서버 주소
    user: 'root', // MySQL 사용자 이름
    password: 'mysql1234', // MySQL 비밀번호
    database: 'shopping_mall' // 사용할 데이터베이스 이름
});

// 상품 데이터 가져오기 API
server.get('/products', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products"); // 상품 데이터 조회
        console.log("상품 데이터 조회 완료:", rows[0].color[2]); // 터미널 로그 출력 - 첫 번째 상품의 2번지 색 출력 : Red
        res.json(rows); // JSON 응답으로 클라이언트에 데이터 전송
    } catch (error) {
        console.error("상품 데이터 조회 실패:", error); // 오류 로그 출력
        res.status(500).json({ error: "서버 오류" });
    }
});

// 고객 데이터 가져오기 API
server.get('/customers', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM customers"); // 고객 데이터 조회
        console.log("📌 고객 데이터 조회 완료:", rows[0]); // 터미널 로그 출력 (첫 번째 고객 데이터 확인)
        res.json(rows); // JSON 응답으로 클라이언트에 데이터 전송
    } catch (error) {
        console.error("❌ 고객 데이터 조회 실패:", error); // 오류 로그 출력
        res.status(500).json({ error: "서버 오류" });
    }
});
// 서버 실행
server.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
});
