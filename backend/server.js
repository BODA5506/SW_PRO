import express from "express";
import { seedDefaultCategories } from "./src/modules/categories/categories.service.js";
import usersRoutes from "./src/modules/users/users.routes.js";
import categoriesRoutes from "./src/modules/categories/categories.routes.js";
import carsRoutes from "./src/modules/cars/cars.routes.js";
import buyerRoutes from "./src/modules/buyer/buyer.routes.js";

const app = express();
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api", buyerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await seedDefaultCategories();
  console.log(`Server running on http://localhost:${PORT}`);
});