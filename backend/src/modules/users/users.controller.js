import { createOrUpdateUser, saveSellerProfile } from "./users.service.js";

export async function registerOrSelectRole(req, res) {
  try {
    const user = await createOrUpdateUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function upsertSellerProfile(req, res) {
  try {
    const profile = await saveSellerProfile(req.params.userId, req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
