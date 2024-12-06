"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.createData = exports.getOneData = exports.getAllData = void 0;
const getAllData = async (req, res, next) => {
    try {
        res.status(200).send("Sucess");
    }
    catch (err) {
        next(err);
    }
};
exports.getAllData = getAllData;
const getOneData = async (req, res, next) => {
    try {
        res.status(200).send("Sucess");
    }
    catch (err) {
        next(err);
    }
};
exports.getOneData = getOneData;
const createData = async (req, res, next) => {
    try {
        res.status(200).send("Sucess");
    }
    catch (err) {
        next(err);
    }
};
exports.createData = createData;
const updateData = async (req, res, next) => {
    try {
        res.status(200).send("Sucess");
    }
    catch (err) {
        next(err);
    }
};
exports.updateData = updateData;
const deleteData = async (req, res, next) => {
    try {
        res.status(200).send("Sucess");
    }
    catch (err) {
        next(err);
    }
};
exports.deleteData = deleteData;
//# sourceMappingURL=user.controller.js.map