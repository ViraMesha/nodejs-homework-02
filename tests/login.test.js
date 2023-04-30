require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("../app");
const { User } = require("../models/user");

mongoose.set("strictQuery", false);

const { TEST_DB_HOST } = process.env;

describe("login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);
    await User.create({
      email: "testUser@gmail.com",
      password: hashedPassword,
      subscription: "pro",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect(TEST_DB_HOST);
  });

  it("response must have status code 200", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
  });

  it("the token must be returned in the response", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser@gmail.com",
      password: "123456",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("the response should return a user object with 2 fields email and subscription, having the data type String", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser@gmail.com",
      password: "123456",
    });

    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
