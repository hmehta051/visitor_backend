const app = require("./index");
const connect = require("./config/db");
app.listen(5000, async (req, res) => {
  try {
    await connect();
    console.log("LISTENING ON PORT 5000");
  } catch (err) {
    return res.status(501).send(err.message);
  }
});
