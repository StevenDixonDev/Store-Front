const Customer = require('../code/customerConstructor');

const customer = new Customer();

test('Connects To Mysql database', done => {
  function callback(flag){
    expect(flag).toBe(true);
    done();
  }
  customer.connect(callback);
});

test('should show database content', ()=>{
  expect(typeof customer.show).toBe('function');
});

test('Should handle user input', done=> {
  function callback(data){
    expect(data).not.toBe(null);
    done();
  }

  // given the input from 
  customer.handleInput({id: 1, quantity: 2}, callback);
})