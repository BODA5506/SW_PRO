import { createCar, getAllActiveCars, getCarById, recommendCars } from "./cars.service.js";

export async function addCar(req, res) {
  try {
    const car = await createCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function listCars(req, res) {
  try {
    const cars = await getAllActiveCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCarDetails(req, res) {
  try {
    const car = await getCarById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRecommendations(req, res) {
  try {
    const results = await recommendCars(req.body);
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
