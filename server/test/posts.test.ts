const url = `${process.env.PRISMA_ENDPOINT}`;
import * as request from 'supertest';

describe("GET /posts", () => {
 it("SHOULD return 200Ok", done => {
  request(url)
   .get("/posts")
   .end((err, res) => {
      expect(res.status).toBe(200);
      done();
   });
 });
});