import Users from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class User {
  static async create(req, res) {
    const { firstName, lastName, email, password } = req.body;

    const adminRegex = /^(admin)/;
    const isAdmin = adminRegex.test(email);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser = new Users({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin
      });

      newUser = await newUser.save();

      res.status(201).send(newUser);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password1");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        // Generate Token
        const {
          firstName,
          password,
          _id,
          lastName,
          __v,
          ...userObj
        } = user._doc;
        const token = jwt.sign({ userObj }, process.env.jwt_secret);
        res.header("x-auth-token", token);
        return res.status(200).send(token);
      } else {
        return res.status(401).send("Invalid email or password2");
      }
    }
  }

  static async updateUser(req, res) {
    try{
      const updatedUser = await Users.findOneAndUpdate(req.body.email, req.body, { new: true });
      console.log(updatedUser);
      return res.status(200).send(updatedUser)
    }catch(error){
      console.log(error)
    }
    
  }
}

export default User;
