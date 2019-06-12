import Car from "../models/cars";
import moment from "moment";

class Cars {
  static async add(req, res) {
    let newCar = new Car(req.body);
    console.log(newCar);
    newCar["images"] = req.carImages;
    newCar["seller"] = req.user.email;
    try {
      newCar = await newCar.save();
      res.status(201).send(newCar);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
}

export default Cars;
