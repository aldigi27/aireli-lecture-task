import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

//own: when receiving request at endpoint /register, controller needs to handle it and delegate logic to User.ts
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body; //own: payload extracted from req body
  const newUser: PlatformUser = {
    id: null, //own: set by db automatically
    email,
    password
  };
  try {
    await createUser(newUser);
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    res.status(400).json({ message: "User creation failed!" });
  }
};