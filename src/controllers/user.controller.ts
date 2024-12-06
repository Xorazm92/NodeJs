import { Request, Response, NextFunction } from "express";

export const getAllData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("Sucess");
  } catch (err) {
    next(err);
  }
};

export const getOneData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("Sucess");
  } catch (err) {
    next(err);
  }
};

export const createData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("Sucess");
  } catch (err) {
    next(err);
  }
};

export const updateData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("Sucess");
  } catch (err) {
    next(err);
  }
};

export const deleteData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("Sucess");
  } catch (err) {
    next(err);
  }
};
