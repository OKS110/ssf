import * as repository from '../repository/cartRepository.js';

// 아이디 번호 호출
export const getCustomerId = async(req, res) => {
    const result = await repository.getCustomerId(req.body);
    res.json(result);
    res.end();
}

// 카트 상품 추가
export const saveToCart = async(req, res) => {
    const result = await repository.saveToCart(req.body);
    res.json(result);
    res.end();
}

// 카트 전체 상품 호출
// export const getCartItems = async(req, res) => {
//     const result = await repository.getCartItems(req.body);
//     // console.log("controller :: getCartItems result --> ", result);
// }