const Customer = require('../code/customerConstructor');

beforeAll(() => {
  return customer = new Customer();
});

describe('Customer object', ()=>{
  test('should have a function named handleInput', ()=>{
    expect(typeof customer.handleInput).toBe('function');
  });
  test('should have a function named queryDataBase', ()=>{
    expect(typeof customer.queryDataBase).toBe('function');
  })
})

describe('handleInput', ()=>{
  test('should handles items not available in db', done =>{
    customer.handleInput({id: 'test', quantity: 1}).then((data)=>{
      expect(data).toBe(null);
      done();
    })
    .catch(err =>{
      expect(err).toBe("An item with that name or id does not exist.");
      done();
    })
  });

  test('should handle items that are available in db', done =>{
    customer.handleInput({id: 'PS4', quantity: 1}).then((data)=>{
      expect(data.affectedRows).toBe(1);
      done();
    })
    .catch(err =>{
      expect(err).toBe(null);
      done();
    })
  })
})





