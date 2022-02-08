
/* --------------------------------- schema --------------------------------- */
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
});
/* -------------------------- función para encriptar -------------------------- */
userSchema.methods.encrypthPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
/* ------------------------ función para desencriptar ----------------------- */
userSchema.methods.checkPassword = function (password) {
  console.log(password);
  console.log(this.email);
  const pas = bcrypt.compareSync(password, this.password);
  console.log(pas);
  return pas;
};
/* ---------------------------------- model --------------------------------- */
const userModel = model("username", userSchema);
/* --------------------------------- export --------------------------------- */
module.exports = userModel;
