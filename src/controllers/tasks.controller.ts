import { Request, Response, NextFunction } from "express";

export const getAllTask = async (
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

export const getOneTask = async (
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

export const createTask = async (
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

export const updateTask = async (
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

export const deleteTask = async (
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
