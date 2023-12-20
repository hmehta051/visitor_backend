const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
let authToken;
describe("Visitor Detail API Tests", function () {
  this.timeout(15000);
  before(async () => {
    try {
      const newVisitor = {
        name: "Test Visitor",
        mobile: "1234567890",
        address: "dfghjk",
      };

      const res = await chai
        .request("https://calm-blue-panther-cuff.cyclic.app/")
        .post("/api/visitor/auth")
        .send(newVisitor);

      authToken = res.body.token;
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  });

  describe("GET /api/member-list", function () {
    it("should retrieve visitor details", (done) => {
      this.timeout(15000);
      chai
        .request("https://calm-blue-panther-cuff.cyclic.app/")
        .get("/api/member-list")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("status").equal("success");
          expect(res.body).to.have.property("vDetails");
          done();
        });
    });
  });
});
