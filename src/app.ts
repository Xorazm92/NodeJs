const bool: Boolean = true;
let bool2 = true;
bool2 = false;

let num: Number = 15;
let num2: String = "1";
let res: String = String(num) + num2;
console.log(res);

const myArr: (Number | String)[] = [1, 2, "3", 4, 5];

const city: [string, number, ...boolean[]] = ["Xiva", 2, true, false, true];

type customType = number | boolean | undefined;

let x: customType = 15;
let y: customType = true;
let z: customType = undefined;

type fnType = number | string;
function myFn(a: fnType): string {
  if (typeof a === "number") {
    return a.toFixed(2);
  } else {
    return a.toUpperCase();
  }
}
const response = myFn(15);
console.log(response);

type cT = number | never;
const myFn2 = (a: number): cT => {
  if (a < 10) {
    throw new Error("10 dan kichik");
  }
  return a * 2;
};

myFn2(11);

const p = "sm"; // literal
let p2: "aaa" = "aaa";
console.log(typeof p2);

type litealCrud = "CREATE" | "UPDATE" | "DELETE" | "GET";
let t: litealCrud = "CREATE";
t = "UPDATE";
