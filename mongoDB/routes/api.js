const router = require("express").Router();
const picture = require("../controllers/pictures")
const user = require("../controllers/user")


router.post('/createUser/', user.createUser)
router.post('/login', user.login)

router.post('/createPicture', picture.createPicture)
router.post('/getPicFromUser', picture.getPicFromUser)
router.delete('/deletePic', picture.deletePic)


module.exports = router;