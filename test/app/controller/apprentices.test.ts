import * as assert from 'assert';
import mm from 'egg-mock';
import tokenGen from '../../utils/token';

describe('徒弟查询', () => {
  let app;

  before(async () => {
    app = mm.app();
    await app.ready();
  });
  after(() => app.close());

  afterEach(mm.restore);

  it('获取徒弟列表', async () => {
    await app.httpRequest()
      .get('/api/v1/users/59f09727fa451437706901db/apprentices')
      .set('Authorization', `Bearer ${tokenGen(app)}`).set('Accept', 'application/json')
      .send({}).expect(200)
      .expect((res) => {
        assert((res.body as any[]).length > 0);
        assert((res.body[0] as Relationship.User).nickName);
      });
  });

  it('404', async () => {
    await app.httpRequest()
      .get('/api/v2/users/59f09727fa451437706901db/apprentices')
      .set('Authorization', `Bearer ${tokenGen(app)}`).set('Accept', 'application/json')
      .send({}).expect(404);
  });

});
