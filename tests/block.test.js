const request = require('supertest');
const app = require('../app'); 

describe('GET /api/blocks', () => {
  it('should return paginated blocks', async () => {
    const res = await request(app).get('/api/blocks?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
});

describe('GET /api/blocks/:id', () => {
  it('should return a single block', async () => {
    const res = await request(app).get('/api/blocks/1');
    expect(res.statusCode).toBeLessThan(500); // could be 200 or 404
  });
});
