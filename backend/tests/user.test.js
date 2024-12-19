import request from "supertest";
import app from "../src/main.js";

const api = request(app);

test("wiwi", () => {
  api.get("/users").expect(200);
});

describe("User routes", () => {
  it("GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(201);
  });
});

describe("User routes", () => {
  it("GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(202);
  });
});
