import Car from "../models/cars";
import moment from "moment";

class Cars {
  static add(req, res) {
    let newCar = new Car(req.body);
    console.log(newCar);
    newCar["images"] = req.carImages;
    newCar["seller"] = req.user.email;
    res.send(newCar);
  }
}

export default Cars;
