import * as repository from '../repository/customerRepository.js';

export const getCustomers = async(req, res) => {
    const result = await repository.getCustomers(req.body);
    console.log(result);
    
    res.json(result);
    res.end();

}

export const getCustomer = async(req, res) => {
    const result = await repository.getCustomer(req.body);
    res.json(result);
    res.end();
}
