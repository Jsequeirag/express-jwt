/* --------------------------------- imports -------------------------------- */
const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");
const config = require("../config");
const verifyToken = require("./verifyToken");
const { secret } = require("../config");

/* --------------------------------- signup --------------------------------- */
router.post("/signup", async (req, res, next) => {
  const { userName, email, password } = req.body;
  const newUser = new userModel({ userName, email, password });
  newUser.password = await newUser.encrypthPassword(newUser.password);
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ auth: true, token });
});
/* --------------------------------- signin --------------------------------- */
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(404).send("The email doesn't exist");
  }
  const passwordIsValid = await user.checkPassword(password);
  if (!passwordIsValid) {
    return res.status(401).json({ auth: false, token: null });
  }
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ auth: true, token });
});
/* ----------------------------------- me ----------------------------------- */
router.get("/me", verifyToken, async (req, res, next) => {
  const user = await userModel.findById(req.userId, { password: 0, email: 0 }); //{ password: 0, email: 0 }--> no incluye esos atributos
  if (!user) {
    return res.status(404).send("no user found");
  }
  res.json(user);
});

module.exports = router;
