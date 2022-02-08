/* -------------------------------------------------------------------------- */
/*                                   packages                                  */
/* -------------------------------------------------------------------------- */
const mongoose = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                           conexion base de datos                           */
/* -------------------------------------------------------------------------- */
mongoose
  .connect(
    "mongodb+srv://MongoDB:2141996JoSe@cluster0.3xs0c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("database connected");
  });
