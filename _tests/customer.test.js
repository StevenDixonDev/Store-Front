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

test('should show database content', ()=>{
  expect(typeof customer.show).toBe('function');
  expect(typeof customer.show('jest:::output = test')).toBe('string');
});

test('Should handle user input', done=> {
  function callback(data){
    expect(data).toBe(1);
    done();
  }
  customer.handleInput({id: 1, quantity: 0}, callback);
})