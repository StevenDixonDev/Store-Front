const customer = require('../storefrontCustomer');

test('Connects To Mysql database', () => {
  expect(customer.connect() ).toBe(true);
});