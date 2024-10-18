import { v4 } from "uuid";
import { readProductsDb, writeProductsDb } from "./db.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, '../database/products.json');

export const addProductToDb = (newProduct) => {
    let products = readProductsDb(dbFilePath);
    const id = v4();
    newProduct = {id, ...newProduct};
    products.push(newProduct);
    writeProductsDb(dbFilePath, products);
    return newProduct;
};

export const getAllProducts = () => {
    return readProductsDb(dbFilePath);
};

export const getOneProduct = (id) => {
    const products = readProductsDb(dbFilePath);
    const product = products.find(product => product.id === id);
    if(!product){
        throw new Error(`Mahsulot topilmadi`);
    }
    return product;
};

export const updateProduct = (id, data) => {
    let products = readProductsDb(dbFilePath);
    const index = products.findIndex(product => product.id === id);
    if(index !== -1){
        products[index] = { ...products[index], ...data };
        writeProductsDb(dbFilePath, products);
        return products[index];
    }
    throw new Error('Mahsulot topilmadi');
};

export const deleteProduct = (id) => {
    const products = readProductsDb(dbFilePath);
    const newProducts = products.filter(product => product.id !== id);
    if(newProducts.length === products.length){
        throw new Error(`Mahsulot topilmadi`);
    }
    writeProductsDb(dbFilePath, newProducts);
    return id;
};