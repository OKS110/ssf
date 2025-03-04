import * as repository from '../repository/mypageRepository.js';

export const getMyinfo = async (req, res) => {
    // console.log('yeeye',req.body);
    const result = await repository.getMyinfo(req.body);
    res.json(result);
    res.end();

}

export const updateMyinfo = async (req, res) => {
    console.log(req.body);    
    if(req.body.value2) {
        const result = await repository.updateMyinfo2(req.body);
        res.json(result);
        res.end();           
    }  else {
        const result = await repository.updateMyinfo(req.body);
        res.json(result);
        res.end();   
    }              
}


export const updateDelivery = async(req,res) =>{
        // console.log('yeeye',req.body);
    const result = await repository.updateDelivery(req.body);
    res.json(result);
    res.end();

}