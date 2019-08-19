const customer = require('../storefrontCustomer');

test('Connects To Mysql database', () => {
  expect(customer.connect() ).toBe(true);
});

test('should show database content', ()=>{
  expext(typeof customer.show).toBe('Function');
});

test('Should handle user input', ()=> {
  // given the input from 
  customer.handleInput(01, 5).then((data)=>{
      expect(data).tobe("Insufficient quanity!");
  })
})