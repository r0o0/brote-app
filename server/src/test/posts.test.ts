const url = `${process.env.APP_ENDPOINT}`;
import * as request from 'supertest';
// console.log('url', url);
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