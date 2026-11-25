import { Router } from "express";
import {
  handleAddCompareItem,
  handleCreateCompareList,
  handleCreatePurchaseRequest,
  handleGetCompareList,
  handleGetFavorites,
  handleGetSellerRequests,
  handleToggleFavorite,
  handleUpdateRequestStatus,
} from "./buyer.controller.js";

const router = Router();

router.post("/favorites/:carId", handleToggleFavorite);
router.get("/favorites/:userId", handleGetFavorites);

router.post("/compare-lists", handleCreateCompareList);
router.post("/compare-lists/:listId/items", handleAddCompareItem);
router.get("/compare-lists/:listId", handleGetCompareList);

router.post("/purchase-requests", handleCreatePurchaseRequest);
router.get("/purchase-requests/seller/:sellerId", handleGetSellerRequests);
router.patch("/purchase-requests/:requestId/status", handleUpdateRequestStatus);

export default router;
