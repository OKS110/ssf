import * as repository from '../repository/productRepository.js';

/** 상품 데이터 전체 호출 **/
export const getProductAll = async(req, res) => {
    const result = await repository.getProductAll(req.body);
    res.json(result);
    res.end();
}

/** 상품 아이디 별 데이터 호출 **/
export const getItem = async(req, res) => {
    const result = await repository.getItem(req.body);
    // console.log("controller :: result --> ", result);
    res.json(result);
    res.end();
}

export const getItem2 = async(req, res) => {
    const result = await repository.getItem(req.body);
    // console.log("controller :: result --> ", result);
    res.json(result);
    res.end();
}

// import * as repository from '../repository/productRepository.js';

// export const getCategoryItems = async (req, res) => {
//     try {
//         const result = await repository.getCategoryItems(req.body);
//         res.json(result);
//         res.end();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "서버 에러" });
//     }
// };

// export const getRankItems = async (req, res) => {
//     try {
//         const result = await repository.getRankItems(req.body); // ✅ 먼저 선언
//         console.log(result); // 이제 정상적으로 사용 가능

//         res.json(result);
//         res.end();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "서버 에러" });
//     }
// }; 에러 핸들링을 위한 코드이지만 서버에서 상품들이 무한루프에 걸리는 현상이 발생한다.
