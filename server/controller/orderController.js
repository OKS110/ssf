import * as repository from '../repository/orderRepository.js';

export const addOrderItem = async(req, res) => {
    const result = await repository.addOrderItem(req.body);
    res.json(result);
    res.end();
}
