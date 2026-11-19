import { Router } from "express";
import mongoose from "mongoose";
import SiteRecord from "../models/SiteRecord.js";
import { collectionSchemas } from "../schemas/collections.js";
import { validate } from "../middleware/validate.js";
import { sendError } from "../utils/apiError.js";

export const publicCollections = Router();
export const adminCollections = Router();
const serialize = (doc: { id: string; data: unknown }) => ({ ...(doc.data as object), id: doc.id });

for (const [collection, schema] of Object.entries(collectionSchemas)) {
  publicCollections.get(`/${collection}`, async (_req, res) => {
    const records = await SiteRecord.find({ resource: collection }).sort({ createdAt: -1, _id: -1 });
    res.json(records.map(serialize));
  });
  adminCollections.post(`/${collection}`, validate(schema), async (req, res) => {
    const record = await SiteRecord.create({ resource: collection, data: req.body });
    res.status(201).json(serialize(record));
  });
  adminCollections.put(`/${collection}/:id`, validate(schema), async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) return sendError(res, 400, "BAD_REQUEST", "Invalid record ID");
    const record = await SiteRecord.findOneAndUpdate(
      { _id: req.params.id, resource: collection }, { $set: { data: req.body } }, { returnDocument: "after", runValidators: true },
    );
    if (!record) return sendError(res, 404, "NOT_FOUND", "Record not found");
    res.json(serialize(record));
  });
  adminCollections.delete(`/${collection}/:id`, async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) return sendError(res, 400, "BAD_REQUEST", "Invalid record ID");
    const record = await SiteRecord.findOneAndDelete({ _id: req.params.id, resource: collection });
    if (!record) return sendError(res, 404, "NOT_FOUND", "Record not found");
    res.json(serialize(record));
  });
}
