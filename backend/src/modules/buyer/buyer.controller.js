import {
  addCarToCompareList,
  createCompareList,
  createPurchaseRequest,
  getCompareList,
  getSellerPurchaseRequests,
  getUserFavorites,
  toggleFavorite,
  updatePurchaseRequestStatus,
} from "./buyer.service.js";

export async function handleToggleFavorite(req, res) {
  try {
    const result = await toggleFavorite(req.body.userId, req.params.carId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function handleGetFavorites(req, res) {
  try {
    const items = await getUserFavorites(req.params.userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleCreateCompareList(req, res) {
  try {
    const list = await createCompareList(req.body.userId, req.body.name, req.body.carIds);
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function handleAddCompareItem(req, res) {
  try {
    const item = await addCarToCompareList(req.params.listId, req.body.carId);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function handleGetCompareList(req, res) {
  try {
    const list = await getCompareList(req.params.listId);
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleCreatePurchaseRequest(req, res) {
  try {
    const request = await createPurchaseRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function handleGetSellerRequests(req, res) {
  try {
    const requests = await getSellerPurchaseRequests(req.params.sellerId);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleUpdateRequestStatus(req, res) {
  try {
    const updated = await updatePurchaseRequestStatus(req.params.requestId, req.body.status);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
