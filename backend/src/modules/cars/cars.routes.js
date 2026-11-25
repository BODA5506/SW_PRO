import { Router } from "express";
import { addCar, getCarDetails, getRecommendations, listCars } from "./cars.controller.js";

const router = Router();

router.get("/", listCars);
router.get("/:id", getCarDetails);
router.post("/", addCar);
router.post("/recommendations", getRecommendations);

export default router;
