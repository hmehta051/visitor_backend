const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const app = require("../index"); // Replace this with the path to your Express app file
const VisitorModel = require("../models/visitor.model"); // Replace this with the path to your Visitor model

const { expect } = chai;
chai.use(chaiHttp);

describe("Visitor Routes", () => {
  before(async () => {
    // Connect to a test database
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Disconnect from the test database after all tests are done
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the Visitor collection before each test
    await VisitorModel.deleteMany({});
  });

  describe("POST /api/visitor/auth", () => {
    it("should create a new visitor", async () => {
      const newVisitor = {
        mobile: "1234567890",
        name: "Test Visitor",
        address: "dfghjk",
      };

      const res = await chai
        .request(app)
        .post("/api/visitor/auth")
        .send(newVisitor);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property("status").to.equal("success");
      expect(res.body).to.have.property("visitor");
      expect(res.body).to.have.property("token");
    });
  });
});
