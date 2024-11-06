const User = require('../model/User');

const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
  
      if (user) {
        
        const userObject = user.toObject();
        delete userObject.password;
  
        res.json(userObject);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Benutzers:", error);
      res.status(500).json({ message: "Serverfehler" });
    }
  }

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
    if(req.body?.email)user.email = req.body.email;
    /* if(req.body?.password)user.password = req.body.password; */
    if(req.body?.biography)user.biography = req.body.biography;
    if(req.body?.country)user.country = req.body.country;
    if(req.body?.nativeLanguage)user.nativeLanguage = req.body.nativeLanguage;
    if(req.body?.learningLanguages)user.learningLanguages = req.body.learningLanguages;
    if(req.body?.profilePicture64)user.profilePicture64 = req.body.profilePicture64;
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


/* const getUser = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'keine Id gefunden'});
    const user = await User.findOne({_id: req.params.id}).exec();
    if(!user){
        return res.status(204).json({'message': 'kein Nutzer gefunden'});
    }
    res.json(user);
} */

const updateBiography = async (req, res) => {

    console.log("Biografie aktualisieren");
  
    try {
      const { username, biography } = req.body;
  
      console.log("Benutzername:", username);
      console.log("Biografie:", biography);
  
      const user = await User.findOne({ username });
  
      if (!user) {
        console.log("Benutzer nicht gefunden");
        return res
          .status(404)
          .json({ success: false, message: "Benutzer nicht gefunden" });
      }
  
      await User.findOneAndUpdate(
        { username },
        {
          biography: biography,
        }
      );
  
      const updatedUser = await User.findOne({ username });
  
      console.log("Updated user:", updatedUser);
  
      console.log("Biografie erfolgreich aktualisiert");
      return res.status(200).json({
        success: true,
        message: "Biografie erfolgreich aktualisiert",
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Biografie", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

module.exports ={
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUser,
    updateBiography
}