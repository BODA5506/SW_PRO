import prisma from "../../config/db.js";

export async function createCar(data) {
  const {
    sellerId,
    name,
    brand,
    model,
    generation,
    year,
    condition,
    color,
    price,
    sizeCategoryId,
    bodyTypeId,
    isChinese,
    horsepower,
    torqueNm,
    engineCapacityCc,
    mileageKm,
    issuesHistory,
    performanceScore,
    comfortScore,
    safetyScore,
    imageUrls,
  } = data;

  return prisma.car.create({
    data: {
      sellerId,
      name,
      brand,
      model,
      generation,
      year: Number(year),
      condition,
      color,
      price: Number(price),
      sizeCategoryId,
      bodyTypeId,
      isChinese: Boolean(isChinese),
      horsepower: Number(horsepower),
      torqueNm: Number(torqueNm),
      engineCapacityCc: Number(engineCapacityCc),
      mileageKm: condition === "USED" ? Number(mileageKm || 0) : null,
      issuesHistory: condition === "USED" ? issuesHistory || "None" : null,
      performanceScore: Number(performanceScore || 3),
      comfortScore: Number(comfortScore || 3),
      safetyScore: Number(safetyScore || 3),
      imageUrls: imageUrls || [],
    },
    include: {
      sizeCategory: true,
      bodyType: true,
      seller: {
        select: { id: true, fullName: true, phone: true, sellerProfile: true },
      },
    },
  });
}

export async function getAllActiveCars() {
  return prisma.car.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    include: {
      sizeCategory: true,
      bodyType: true,
      seller: {
        select: { id: true, fullName: true, phone: true, sellerProfile: true },
      },
    },
  });
}

export async function getCarById(carId) {
  return prisma.car.findUnique({
    where: { id: carId },
    include: {
      sizeCategory: true,
      bodyType: true,
      seller: {
        select: { id: true, fullName: true, phone: true, sellerProfile: true },
      },
    },
  });
}

export async function recommendCars(answers) {
  const {
    maxBudget,
    avoidChinese = false,
    performanceImportant = false,
    comfortImportant = false,
    safetyImportant = false,
    preferredSizeId,
    preferredBodyTypeId,
    condition,
  } = answers;

  const cars = await prisma.car.findMany({
    where: {
      status: "ACTIVE",
      ...(maxBudget ? { price: { lte: Number(maxBudget) } } : {}),
      ...(avoidChinese ? { isChinese: false } : {}),
      ...(condition ? { condition } : {}),
    },
    include: {
      sizeCategory: true,
      bodyType: true,
    },
  });

  const ranked = cars.map((car) => {
    let score = 0;
    let maxScore = 0;

    if (performanceImportant) {
      maxScore += 30;
      score += (car.performanceScore / 5) * 30;
    }
    if (comfortImportant) {
      maxScore += 30;
      score += (car.comfortScore / 5) * 30;
    }
    if (safetyImportant) {
      maxScore += 30;
      score += (car.safetyScore / 5) * 30;
    }
    if (preferredSizeId) {
      maxScore += 5;
      if (car.sizeCategoryId === preferredSizeId) score += 5;
    }
    if (preferredBodyTypeId) {
      maxScore += 5;
      if (car.bodyTypeId === preferredBodyTypeId) score += 5;
    }

    const matchPercent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;

    return {
      ...car,
      matchPercent,
    };
  });

  return ranked.sort((a, b) => b.matchPercent - a.matchPercent);
}
