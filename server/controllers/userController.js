const User = require('../model/User');


const getAllUser = async (req, res) => {
    const users = await User.find();
    if(!users) return res.status(204).json({'message': 'Keine Nutzer gefunden'});
    res.json(users);
}


const createNewUser = async (req, res) => {
    if(!req?.body?.firstname||!req?.body?.lastname){
        return res.status(400).json({'message': 'Name ist unvollständig'});
    }
    try{
        const result = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch(err){
        console.error(err);
    }
}


const updateUser = async (req, res) => {
    if(!req?.nody?.id){
        return res.status(400).json({'message': 'keine Id gefunden'});
    }
    const user = await User.findOne({_id: req.body.id}).exec();
    if(!user){
        return res.status(204).json({'message':'Id not found'})
    }
    if(req.body?.firstname)user.firstname = req.body.firstname;
    if(req.body?.lastname)user.lastname = req.body.lastname;
    const result = await user.save();
    res.json(result);
}


const deleteUser = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message': 'keine Id gefunden'});
    const user = await User.findOne({_id: req.body.id}).exec();
    if(!user){
        return res.status(204).json({'message':'Id not found'});
    }
    const result = await user.deleteOne({_id: req.body.id});
    res.json(result);
}


const getUser = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'keine Id gefunden'});
    const user = await User.findOne({_id: req.params.id}).exec();
    if(!user){
        return res.status(204).json({'message': 'kein Nutzer gefunden'});
    }
    res.json(user);
}

module.exports ={
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}