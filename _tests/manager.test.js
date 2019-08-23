const Manager = require('../code/managerConstructor');

beforeAll(() => {
  return manager = new Manager();
});

test('Connects To Mysql database', done => {
  function callback(flag){
    expect(flag).toBe(true);
    done();
  }
  manager.connect(callback);
});