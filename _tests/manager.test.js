const Manager = require('../code/managerConstructor');

beforeAll(() => {
  return manager = new Manager();
});

test('Connects To Mysql database', done => {
  function callback(err) {
    expect(err).toBe(null);
    done();
  }
  manager.connection().connect(callback);
});


describe("Manager object", () => {
  // it should have a function that shows products
  test('Should have a function named showProducts', () => {
    expect(typeof manager.showProducts).toBe('function');
  })
  //should have a function that shows inventory that is low
  test('Should have a function named showLowInvetory', () => {
    expect(typeof manager.showLowInvetory).toBe('function');
  })
  // should have a function that adds to inventory
  test('Should have a function named addToInventory', () => {
    expect(typeof manager.addToInventory).toBe('function');
  })
  // should have a function that adds a new item
  test('Should have a function named addNewProdcut', () => {
    expect(typeof manager.addNewProdcut).toBe('function');
  })
});

test("Show products should return an array of items", done => {
  manager.showProducts().then(array => {
    expect(Array.isArray(array)).toBeTruthy();
    done();
  })
});


test("Show Low inventory should should return an array of items with a quantity less than 5", done => {
  manager.showLowInvetory().then(array => {
    expect(array.every(item => item.stock_quantity < 5)).toBe(true);
    done();
  })
});

test("Add inventory should update the database", done => {
  manager.addToInventory({ id: 1, quantity: 2 }).then(data => {
    expect(data.affectedRows).toBe(1);
    done();
  })
});

test("Add inventory should throw an error if item does not exist", done => {
  manager.addToInventory({ id: 'test', quantity: 2 }).then(data => {
    expect(data).toBe(null);
    done();
  })
    .catch(err => {
      expect(err).not.toBe(null);
      done();
    })
});

test('Add new product should update database', done => {
  manager.addNewProdcut({ name: 'law book', department: 'law', price: 10, quantity: 2 }).then(data => {
    expect(data.affectedRows).toBe(1);
    manager.connection().query('DELETE FROM products WHERE item_id = ?', [data.insertId], () => done())
  })
});

test('Add new product should fail if a product already exists', done => {
  manager.addNewProdcut({ name: 'ps4', department: 'law', price: 10, quantity: 2 }).then(data => {
    expect(data.affectedRows).toBe(0);
    done();
  })
    .catch(err => {
      expect(err).not.toBe(null);
      done();
    })
});

