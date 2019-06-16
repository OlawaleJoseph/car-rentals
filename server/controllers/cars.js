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

  static async getAllCars(req, res) {
    try {
      const cars = await Car.find();
      res.status(200).send(cars);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async getOneCar(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("No id Given");
    } else {
      try {
        const foundCar = await Car.findOne({ _id: id });
        if (foundCar == null) {
          return res.status(404).send("Car not found");
        } else {
          return res.status(200).send(foundCar);
        }
      } catch (error) {
        console.log(error)
        return res.status(400).send("Error occured while trying to find car");
      }
    }
  }
}

export default Cars;
