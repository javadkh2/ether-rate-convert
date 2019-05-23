import request from "supertest";
import app from "../src/app";

describe("test eth-rate-convert service", () => {
    it("should response the GET method /eth-rate-convert?rate=0.1 ether/day", (done) => {
        request(app).get("/eth-rate-convert?rate=0.1 ether/day").then((response) => {
            const result = 0.1 * 1000000000000000000 / 24;
            expect((response as any).statusCode).toBe(200);
            expect((response as any).body.rate).toBe(result);
            done();
        });
    });
});