import * as repository from '../repository/orderRepository.js';

export const orderItem = async(req, res) => {
    const result = await repository.orderItem(req.body);
    res.json(result);
    res.end();
}
