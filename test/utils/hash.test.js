const isString = require('lodash/isString');
const hash = require('../../src/utils/hash/hash');

test('Can hash the password', async () => {
    const pwd = 'qwerty';
    const hashed = await hash.hashPassword(pwd);
    expect(isString(hashed)).toBeTruthy();
});


test('Can compare passwords', async () => {
    const pwd = 'qwerty';
    const hashed = await hash.hashPassword(pwd);
    const isMatch = await hash.comparePassword(pwd, hashed);
    expect(isMatch).toBeTruthy();
});

test('counts', () => {
    const sum = 10;
    expect(sum).toEqual(5 + 5);
    console.log('running');
});