import request from "supertest";
import app from "../src/main.js";

describe("User routes", () => {
    it("GET /users", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toBe(200);
    });
});