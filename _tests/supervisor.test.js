const Supervisor = require('../code/supervisorConstructor');

beforeAll(() => {
    return supervisor = new Supervisor();
});

describe('Supervisor Object', () => {
    test('should have a function called viewProducts', () => {
        expect(supervisor.viewProducts).not.toBe(undefined);
        expect(typeof supervisor.viewProducts).toBe('function');
    });

    test('should have a function called createDepartment', () => {
        expect(supervisor.createDepartment).not.toBe(undefined);
        expect(typeof supervisor.createDepartment).toBe('function');
    });
});

describe('viewProducts should', () => {
    test('return an array of data', done => {
        supervisor.viewProducts().then(data => {
            expect(Array.isArray(data)).toBe(true);
            done();
        });
    });
});

describe('createDepartment should', () => {
    test('should add a new department to the departments table', done => {
        supervisor.createDepartment({ department: 'test', over_head: 2000 }).then(data => {
            expect(data.affectedRows).toBe(1);
            supervisor.connection().query('DELETE FROM departments WHERE department_id = ?', [data.insertId], () => done())
        }).
            catch(err => {
                expect(err).toBe(null);
                done();
            })
    });
    test('should throw an error when creating a department that exists', done => {
        supervisor.createDepartment({ department: 'Gardening', over_head: 2000 }).then(data => {
            expect(data).toBe(null);
            done();
        }).catch(err => {
            expect(err).not.toBe(null);
            done();
        })
    });
});

