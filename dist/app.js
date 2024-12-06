"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bool = true;
let bool2 = true;
bool2 = false;
let num = 15;
let num2 = "1";
let res = String(num) + num2;
console.log(res);
const myArr = [1, 2, "3", 4, 5];
const city = ["Xiva", 2, true, false, true];
let x = 15;
let y = true;
let z = undefined;
function myFn(a) {
    if (typeof a === "number") {
        return a.toFixed(2);
    }
    else {
        return a.toUpperCase();
    }
}
const response = myFn(15);
console.log(response);
const myFn2 = (a) => {
    if (a < 10) {
        throw new Error("10 dan kichik");
    }
    return a * 2;
};
myFn2(11);
const p = "sm"; // literal
let p2 = "aaa";
console.log(typeof p2);
let t = "CREATE";
t = "UPDATE";
//# sourceMappingURL=app.js.map