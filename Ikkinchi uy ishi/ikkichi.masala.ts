// 1. Array (Massiv)
let mixedArray: (string | number)[] = ["Hello", 42, "World", 99];
console.log("Array:", mixedArray);

// 2. Tuple (Kuple)
let person: [string, number, string] = ["Ali", 25, "1998-05-10"];
console.log("Tuple:", person);

// 3. Type Aliases (Tur nomi aliaslari)
type Person = {
  name: string;
  age: number;
  address: string;
};

let user: Person = { name: "Bobur", age: 30, address: "Toshkent" };
console.log("Type Alias:", user);

// 4. Union Type (Ittifoq turi)
let id: string | number;
id = "123ABC";
console.log("Union (string):", id);
id = 456;
console.log("Union (number):", id);

// 5. Function (Funktsiya)
function addNumbers(a: number, b: number): number {
  return a + b;
}

console.log("Function:", addNumbers(5, 10));

// 6. Literal Type (Literal tur)
let direction: "left" | "right" | "up" | "down";
direction = "left"; // To'g'ri
console.log("Literal Type:", direction);

// 7. Object Type (Obyekt turi)
let car: { make: string; model: string; year: number } = {
  make: "Tesla",
  model: "Model 3",
  year: 2023,
};
console.log("Object Type:", car);

// 8. Optional Properties (Ixtiyoriy xususiyatlar)
type Book = {
  title: string;
  author?: string; // Ixtiyoriy
};

let book1: Book = { title: "Dunyo", author: "Ortiqov" };
let book2: Book = { title: "Odamlar" };
console.log("Optional Properties:", book1, book2);

// 9. Readonly (O'zgartirish mumkin bo'lmagan xususiyatlar)
type Profile = {
  readonly id: number;
  name: string;
};

let userProfile: Profile = { id: 101, name: "Zuhra" };
// userProfile.id = 102; // Xato bo'ladi
userProfile.name = "Zilola";
console.log("Readonly:", userProfile);

// 10. Type Assertions (Turga oid aniqlashlar)
let someValue: unknown = "Hello, TypeScript!";
let strLength: number = (someValue as string).length;
console.log("Type Assertions:", strLength);
