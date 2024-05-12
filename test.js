const request = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const Sign = require("../models/signModel");

describe("User Authentication and Actions", () => {
  let authToken;

  before(async () => {
    await User.create({
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      password: "password",
    });

    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "password" });

    authToken = loginResponse.body.token;
  });

  it("should allow user to provide feedback and add a sign", async () => {
    const feedbackResponse = await request(app)
      .post("/feedback")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ message: "Test feedback" });

    expect(feedbackResponse.status).to.equal(201);
    expect(feedbackResponse.body.status).to.equal("success");

    const signData = {
      image: "test_image.jpg",
      category: "test_category_id",
      meaning: "Test sign meaning",
    };

    const signResponse = await request(app)
      .post("/signs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(signData);

    expect(signResponse.status).to.equal(201);
    expect(signResponse.body.status).to.equal("success");
    expect(signResponse.body.data.image).to.equal(signData.image);
    expect(signResponse.body.data.category).to.equal(signData.category);
    expect(signResponse.body.data.meaning).to.equal(signData.meaning);
  });
});
