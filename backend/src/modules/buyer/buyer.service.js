import prisma from "../../config/db.js";

export async function toggleFavorite(userId, carId) {
  const existing = await prisma.favorite.findUnique({
    where: { userId_carId: { userId, carId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return { liked: false };
  }

  await prisma.favorite.create({ data: { userId, carId } });
  return { liked: true };
}

export async function getUserFavorites(userId) {
  return prisma.favorite.findMany({
    where: { userId },
    include: { car: true },
  });
}

export async function createCompareList(userId, name, carIds = []) {
  return prisma.compareList.create({
    data: {
      userId,
      name,
      items: {
        create: carIds.map((carId) => ({ carId })),
      },
    },
    include: {
      items: {
        include: {
          car: {
            include: { sizeCategory: true, bodyType: true },
          },
        },
      },
    },
  });
}

export async function addCarToCompareList(compareListId, carId) {
  return prisma.compareListItem.create({
    data: { compareListId, carId },
  });
}

export async function getCompareList(compareListId) {
  return prisma.compareList.findUnique({
    where: { id: compareListId },
    include: {
      items: {
        include: {
          car: {
            include: { sizeCategory: true, bodyType: true },
          },
        },
      },
    },
  });
}

export async function createPurchaseRequest(data) {
  const { buyerId, carId, buyerName, buyerPhone, buyerEmail, buyerNationalId, message } = data;

  return prisma.purchaseRequest.create({
    data: {
      buyerId,
      carId,
      buyerName,
      buyerPhone,
      buyerEmail,
      buyerNationalId,
      message,
    },
    include: {
      car: {
        select: { id: true, name: true, price: true, sellerId: true },
      },
    },
  });
}

export async function getSellerPurchaseRequests(sellerId) {
  return prisma.purchaseRequest.findMany({
    where: {
      car: { sellerId },
    },
    orderBy: { createdAt: "desc" },
    include: {
      car: true,
    },
  });
}

export async function updatePurchaseRequestStatus(requestId, status) {
  return prisma.purchaseRequest.update({
    where: { id: requestId },
    data: { status },
  });
}
