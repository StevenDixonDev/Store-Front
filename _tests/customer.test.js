const customer = require('../storefrontCustomer');

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

test('Should handle user input', ()=> {
  // given the input from 
  customer.handleInput({id: 0, quantity: 50}).then((data)=>{
      expect(data).tobe("Insufficient quanity!");
  })
})