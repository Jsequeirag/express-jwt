const app = require("./app");
require("./database");//cargo la base de datos
/* --------------------- función para iniciar el servidor -------------------- */
async function init() {
  await app.listen(3000, () => {
    console.log("*server:3000*");
  });
}
init();
