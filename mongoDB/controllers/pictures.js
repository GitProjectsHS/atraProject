const User = require('../models/User');
const Picture = require('../models/Pictures');

const createPicture = async (req, res) => {
  try {
    let pic = await Picture.findOne({ idPic: req.body.idPic })
    if (!pic) {
      const id = req.body.id;

      pic = await new Picture({ idPic: req.body.idPic, title: req.body.title, url: req.body.url, thumbnailUrl: req.body.thumbnailUrl })//,owner:Picture.owner.push(id)
      await pic.save().then((pic) => {
        res.status(200).json({ message: 'picture created', newpic: pic })
      }).catch((err) => {
        res.status(400).send('error!')
      })
    }
    //----------------------------------------push to arrays----------------------------------
    //take user to add picture
    //To do change to req
    const idPict = await User.findById('602d6da9cbf75848188a2a5d').populate
      ({ path: 'pictures', match: { url: pic.url } })
    if (idPict.pictures == '') {
      const user = await User.findById('602d6da9cbf75848188a2a5d')
      pic.owner.push(user)
      await pic.save().then((pic) => {
      }).catch((err) => {
        res.status(400).send('error saved')
      })
      //put the new picture
      user.pictures.push(pic);
      await user.save().then((user) => {
        res.status(200).json({ message: 'picture created', userWithPic })
      }).catch((err) => {
        res.status(400).send('error!!!!')
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const deletePic = async (req, res) => {
  try {
    const user = await User.findById(req.body.id.id);
    let index = await user.pictures.indexOf(req.body.id.idPic);

    await user.pictures.splice(index, 1);
    await user.save().then((user) => {

      res.status(200).json({ message: 'picture created', newUser: user })
    }).catch((err) => {
      res.status(400).send('error!!!!')
    });
    res.status(200).json({ "message": "task is deleted" });


  } catch (err) {
    res.status(400).json({ "message error": err.massage });
  }
}


const getPicFromUser = async (req, res) => {
  try {
    const pic = await User.findById('602d6da9cbf75848188a2a5d').populate('pictures');
    if (pic == null)
      res.send("could not have a pic")
    return res.json({ status: 200, myPic: pic })
  } catch (error) {
    res.status(400).json({ myMessage: error.massage })
  }
}

module.exports = { createPicture, deletePic, getPicFromUser }
