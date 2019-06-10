import userSchema from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class User {
  static async create(req, res) {
    const { firstName, lastName, email, password } = req.body;

    const adminRegex = /^(admin)/;
    const isAdmin = adminRegex.test(email);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser = new userSchema({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin
      });

      newUser = await newUser.save();

      console.log(newUser);
      res.send(newUser);
    } catch (error) {
      // console.log(error.message);
      res.send(error);
    }
  }
}

export default User;
