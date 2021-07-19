const path = require("path")
const { Router } = require("express")
const router = Router()
const usersController = require("../controllers/users.controller")
const imagemin = require("imagemin")
const imageminJpegtran = require("imagemin")
const imageminPngquant = require("imagemin")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp")
  },
  filename: function (req, file, cb) {
    const { ext } = path.parse(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  },
})

const upload = multer({ storage: storage })

async function minAvatart(req, res, next) {
  const files = await imagemin(["images/*.{jpg,png}"], {
    destination: "build/images",
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  })
  console.log(files)
}

router.post("/auth/register", usersController.validateUser, upload.single("userAvatar"), usersController.register)
router.post("/auth/login", usersController.validateUser, usersController.login)
router.post("/auth/logout", usersController.authorize, usersController.logout)
router.get("/users/current", usersController.authorize, usersController.getCurrentUser)
router.patch("/users/:userId", usersController.authorize, usersController.validateUserSubscription, usersController.upDateSubscription)
router.patch("/users/avatars", usersController.authorize, upload.single("userAvatar"))

module.exports = router
