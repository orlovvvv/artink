import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import * as UserService from "./user.service";
import jwt from "jsonwebtoken";
import { createId } from "../utils/id.generator";

const jwtSecret =
  "dcuo4vd9hKU24OmTeWWpJsHgPabNZeqYsakwLvRSEenDm0y0K9loHrQsSQEfJI0k";
const moment = require("moment");
export const userRouter = express.Router();

// Lista wszystkich użytkowników

userRouter.get("/", async (request: Request, response: Response) => {
  try {
    const users = await UserService.listUsers();
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Użytkownik po ID
userRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.body.id as string;
  try {
    const user = await UserService.getUser(id);
    if (user) {
      return response.status(200).json(user);
    }
    return response.status(404).json("User not found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Utwórz użytkownika
userRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  body("email").isString(),
  body("password").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty) {
      return response.status(400).json({ errors: errors.array() });
    }
    const date = moment().valueOf().toString();
    request.body.password = (
      await bcrypt.hash(request.body.password, 10)
    ).toString();
    request.body.token = jwt.sign(date, jwtSecret!).toString();
    try {
      const user = request.body;
      const newUser = await UserService.createUser(user);
      return response.status(201).json(newUser);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Logowanie
userRouter.post(
  "/login",
  body("email").isString(),
  body("password").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty) {
      return response.status(400).json({ errors: errors.array() });
    }
    request.body.password = bcrypt.hash(request.body.password, 10);
    try {
      const date = moment().valueOf().toString();
      const user = request.body;
      const loggedUser = await UserService.loginUser(user.email, user.password);

      return (
        // Po poprawnym zalogowaniu utwórz nowy token dla użytkownika i zwróć go w odpowiedzi
        UserService.updateToken(
          user.id,
          user.email,
          jwt.sign(createId(), jwtSecret!).toString()
        ),
        response.status(200).json(loggedUser)
      );
    } catch (error: any) {
      return response.status(401).json(error.message);
    }
  }
);

// Aktualizacja użytkownika
userRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  body("email").isString(),
  body("password").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id: string = request.headers.id as string;
    try {
      const user = request.body;
      const updatedUser = await UserService.updateUser(user, id);
      return response.status(200).json(updatedUser);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Usunięcie użytkownika
userRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: string = request.body.id as string;
  try {
    await UserService.deleteUser(id);
    return response.status(204).json("User has been successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
