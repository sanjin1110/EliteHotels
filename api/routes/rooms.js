import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability
} from "../controllers/room.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid",verifyToken,  createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyToken, updateRoom);
//DELETE
router.delete("/:id/:hotelid",  deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;
