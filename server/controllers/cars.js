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
        console.log(error);
        return res.status(400).send("Error occured while trying to find car");
      }
    }
  }

  static async updateCar(req, res) {
    try {
      const foundCar = await Car.findById(req.params.id);
      if (req.user.email !== foundCar.seller) {
        res.status(403).send("You are not authorized");
      } else {
        try {
          const updatedUser = await Car.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, useFindAndModify: false }
          );
          res.status(200).send(updatedUser);
        } catch (error) {
          res.status(404).send("Car does not exist");
        }
      }
    } catch (error) {
      res.status(400).send("Invalid Car Id");
    }
  }

  static async deleteCar(req, res) {
    if (!req.params.id) return res.status(400).send("Please Select a Car");
    try {
      const car = await Car.findOne({ _id: req.params.id });
      if (!car) {
        return res.status(404).send("Car not found");
      } else {
        try {
          await Car.findByIdAndDelete(req.params.id);
          res.status(204).send("Car deleted successfully");
        } catch (error) {
          res.status(500).send("Something went wrong");
        }
      }
    } catch (error) {
      res.status(404).send("Invalid Car Id");
    }
  }
}

export default Cars;
