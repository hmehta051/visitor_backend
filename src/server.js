const app = require("./index");
const connect = require("./config/db");

// const chai = require("chai");
// const chaiHttp = require("chai-http");
// chai.use(chaiHttp);

app.listen(5000, async (req, res) => {
  try {
    await connect();
    console.log("LISTENING ON PORT 5000");
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

// const x = async () => {
//   try {
//     const newVisitor = {
//       mobile: "1234567890",
//       name: "Test Visitor",
//       address: "dfghjk",
//     };

//     const res = await chai
//       .request("https://calm-blue-panther-cuff.cyclic.app")
//       .post("/api/visitor/auth")
//       .send(newVisitor);

//     console.log("Response Body:", res); // Log the response body
//   } catch (error) {
//     console.error("Error during login:", error.message);
//   }
// };
// x();
