import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//import models
import { User } from "../models/user.model";

export const newUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      last_name,
      email,
      password,
      phone_number } = req.body;
    // validate if the user exist
    const userExist = await User.findOne({ where: { email: email } });

    if (userExist) {
      throw `El correo electronico '${email}' ya se encuentra registrado`;
    }

    const hashPass = await bcrypt.hash(password, 12);
    // save user into db
    await User.create({
      name,
      last_name,
      email,
      password: hashPass,
      phone_number
    });

    // retunr response to the cliente
    res.status(200).json({
      status: 1,
      msg: `User ${name} created`,
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: `Error: User not created: ${error}`,
    })
  }

}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // validate if user exist
    const userExist: any = await User.findOne({ where: { email: email } });

    if (!userExist) {
      throw 'Usuario no registrado';
    }

    // validate passwort

    const validPass = await bcrypt.compare(password, userExist.password);

    if (!validPass) {
      throw 'Constraseña invalida';
    }

    //@ts-ignore
    // generate token
    const token = jwt.sign({
      email,
    }, process.env.SECRET_KEY ||'auxkey' );


    res.status(200).json({
      status: 1,
      msg: 'Peticion correcta',
      id_user: userExist.id_user,
      token
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: `Error: ${error}`,
    });
  }
}