const Manager = require('../code/managerConstructor');

beforeAll(() => {
  return manager = new Manager();
});

test('Connects To Mysql database', done => {
  function callback(err){
    expect(err).toBe(null);
    done();
  }
  manager.connection().connect(callback);
});

//should have a function that shows products

//should have a function that shows inventory that is low

// should have a function that adds to inventory

// should have a function that adds a new item

