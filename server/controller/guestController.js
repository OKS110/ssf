import * as repository from '../repository/guestRepository.js';

export const getGuestList = async(req, res) => {
    const result = await repository.getGuestList(req.body);
    res.json(result);
    res.end();
}

export const getGuest = async(req, res) => {
    const result = await repository.getGuest(req.body);
    res.json(result);
    res.end();
}
