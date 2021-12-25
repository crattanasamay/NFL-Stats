const validation = require("../config/validate");

var object = {
    name : "kevin",
    lastname : "ram",
    email : "kevin@gmail.com",
    password : "123"
}

// check if all fields are filled
test('Valid User', () => {
    expect(validation.validateUser(object)).toBe(true);
});

test("Test Password length", () => {
    expect(validation.validatePassword(object.password)).toBe(false);
});

test("Test Password no uppercase", () => {
    expect(validation.validatePassword("kevin1")).toBe(false);
});

test("Test Password no lowercase", () => {
    expect(validation.validatePassword("KEVIN1234")).toBe(false);
});

test("Test Password strong password", () => {
    expect(validation.validatePassword("Kevin1")).toBe(true);
});