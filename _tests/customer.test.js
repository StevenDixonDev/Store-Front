const Customer = require('../code/customerConstructor');

beforeAll(() => {
  return customer = new Customer();
});

test('Connects To Mysql database', done => {
  function callback(flag){
    expect(flag).toBe(true);
    done();
  }
  customer.connect(callback);
});


