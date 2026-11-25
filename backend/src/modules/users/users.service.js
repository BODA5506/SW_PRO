import prisma from "../../config/db.js";

export async function createOrUpdateUser(data) {
  const { fullName, email, phone, nationalId, role } = data;

  return prisma.user.upsert({
    where: { email },
    update: { fullName, phone, nationalId, role },
    create: { fullName, email, phone, nationalId, role: role || "BUYER" },
  });
}

export async function saveSellerProfile(userId, data) {
  const { fullName, phone, companyName, city, location, nationalId } = data;

  await prisma.user.update({
    where: { id: userId },
    data: { fullName, phone, nationalId, role: "SELLER" },
  });

  return prisma.sellerProfile.upsert({
    where: { userId },
    update: { companyName, city, location, nationalId },
    create: { userId, companyName, city, location, nationalId },
  });
}
