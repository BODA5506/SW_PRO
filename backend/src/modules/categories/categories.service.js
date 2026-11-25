import prisma from "../../config/db.js";

const DEFAULT_CATEGORIES = [
  { type: "SIZE", name: "Micro" },
  { type: "SIZE", name: "City Car" },
  { type: "SIZE", name: "Small" },
  { type: "SIZE", name: "Compact" },
  { type: "SIZE", name: "Mid-Size" },
  { type: "SIZE", name: "Executive" },
  { type: "SIZE", name: "Luxury Full-Size" },
  { type: "SIZE", name: "Subcompact SUV" },
  { type: "SIZE", name: "Compact SUV" },
  { type: "SIZE", name: "Mid-Size SUV" },
  { type: "SIZE", name: "Full-Size SUV" },
  { type: "SIZE", name: "Luxury Full-Size SUV" },
  { type: "SIZE", name: "Off-Road SUV" },
  { type: "BODY_TYPE", name: "Sedan" },
  { type: "BODY_TYPE", name: "Hatchback" },
  { type: "BODY_TYPE", name: "Coupe" },
  { type: "BODY_TYPE", name: "Convertible" },
  { type: "BODY_TYPE", name: "Station Wagon" },
  { type: "BODY_TYPE", name: "Crossover" },
  { type: "BODY_TYPE", name: "Pickup Truck" },
  { type: "BODY_TYPE", name: "Minivan" },
  { type: "BODY_TYPE", name: "Van" },
  { type: "BODY_TYPE", name: "Sports Car" },
  { type: "BODY_TYPE", name: "Supercar" },
  { type: "BODY_TYPE", name: "Hypercar" },
];

export async function seedDefaultCategories() {
  for (const item of DEFAULT_CATEGORIES) {
    await prisma.category.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    });
  }
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });
}
