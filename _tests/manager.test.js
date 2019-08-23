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
})

test("Show products should return an array of items", done => {
  manager.showProducts().then(array => {
    expect(Array.isArray(array)).toBeTruthy();
    done();
  })
})


test("Show Low inventory should should return an array of items with a quantity less than 20", done => {
  manager.showLowInvetory().then(array => {
    expect(array.every(item => item.stock_quanity < 20)).toBeTruthy();
    done();
  })
})