import * as repository from '../repository/mypageRepository.js';

export const getMyinfo = async (req, res) => {
    // console.log('yeeye',req.body);
    const result = await repository.getMyinfo(req.body);
    res.json(result);
    res.end();

}

export const updateMyinfo = async (req, res) => {
    // console.log(req.body);
    if (req.body.value2) {
        const result = await repository.updateMyinfo2(req.body);
        res.json(result);
        res.end();
    } else {
        const result = await repository.updateMyinfo(req.body);
        res.json(result);
        res.end();
    }
}


export const updateDelivery = async (req, res) => {
    // console.log('yeeye',req.body);
    const result = await repository.updateDelivery(req.body);
    res.json(result);
    res.end();

}
export const updateDeliveryExtra = async (req, res) => {
    // console.log('yeeye',req.body.id);
    let ph = req.body.deliForm.phone.substring(0,3)
    .concat('-',req.body.deliForm.phone.substring(3,7),'-',req.body.deliForm.phone.substring(7,11));

    let add = req.body.deliForm.zoneCode.concat('',req.body.deliForm.address).concat('@',req.body.deliForm.extraAddress,'/');
    let nameAndPhone = req.body.deliForm.name.concat('#',ph);
    const all = add.concat(nameAndPhone);
    // console.log(add);
    const result = await repository.updateDeliveryExtra(all,req.body.id);
    res.json(result);
    res.end();
}
export const updateDeliveryExtra2 = async (req, res) => {
    let add = req.body.deliForm2.zoneCode.concat('',req.body.deliForm2.address).concat('@',req.body.deliForm2.extraAddress,'/');
    let nameAndPhone = req.body.deliForm2.name.concat('#',req.body.deliForm2.phone);
    const all = add.concat(nameAndPhone);
    // console.log(add);
    const result = await repository.updateDeliveryExtra(all,req.body.id);
    res.json(result);
    res.end();
}

export const deleteDelivery = async(req, res) => {
    // console.log('yeeye',req.body);
    const result = await repository.deleteDelivery(req.body);
    res.json(result);
    res.end();
}

export const addLike = async(req,res) => {
    // console.log('yeeye',req.body);
    const cid = req.body.cid;
    const pid = req.body.pid;    
    const result = await repository.addLike(cid,pid);
    res.json(result);
    res.end();
}
export const deleteLike = async(req,res) => {
    // console.log('yeeye',req.body.cid.customer_id);
    const cid = req.body.cid;
    const pid = req.body.pid;
    
    const result = await repository.deleteLike(cid,pid);
    res.json(result);
    res.end();
}

export const getAllLike = async(req,res) => {
    
    const result = await repository.getAllLike(req.body.cid);
    res.json(result);
    res.end();
}