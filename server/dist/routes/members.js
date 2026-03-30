import express from 'express';
import db from "../db/connection.js";
const router = express.Router();
router.get("/", async (req, res) => {
    let collection = db.collection("members");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
});
export default router;
