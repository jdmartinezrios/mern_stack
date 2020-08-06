const app = require("./app");
require("dotenv").config();
require("./database");

const main = () => {
  app.listen(app.get("port"), () => {
    console.log("Server is runnig on", `https://localhost:${app.get("port")}`);
  });
};

main();
