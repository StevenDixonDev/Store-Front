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

test('it handles items not available in db', done =>{
  customer.handleInput({id: 'test', quantity: 1}).then((data)=>{
    expect(data).toBe(undefined);
    done();
  })
  .catch(err =>{
    expect(err).toBe("An item with that name or id does not exist.");
    done();
  })
})

test('it handles items that are available in db', done =>{
  customer.handleInput({id: 'PS4', quantity: 1}).then((data)=>{
    expect(data).not.toBe(undefined);
    done();
  })
  .catch(err =>{
    expect(err).toBe(undefined);
    done();
  })
})

// test that the connection is ended, this must be run last or tests will not be exited
test('should have a function that closes the connection', done => {
    customer.connection().end((err)=>{
      expect(err).toBe(undefined);
      done();
    })
});