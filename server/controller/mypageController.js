import * as repository from '../repository/mypageRepository.js';

export const getMyinfo = async(req,res) => {
    // console.log('yeeye',req.body);
    const result = await repository.getMyinfo(req.body);
    res.json(result);
    res.end();
    
}