import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Developer, { IDeveloperDocument } from '../models/Developer.js';
import { sendError } from '../utils/apiError.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch {
    sendError(res, 500, 'INTERNAL_ERROR', 'Unable to fetch developers');
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendError(res, 400, 'BAD_REQUEST', 'Invalid id');
    }

    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return sendError(res, 404, 'NOT_FOUND', 'Developer not found');
    }

    res.json(developer);
  } catch {
    sendError(res, 500, 'INTERNAL_ERROR', 'Unable to fetch developer');
  }
});

router.post('/', async (req: Request<object, object, IDeveloperDocument>, res: Response) => {
  try {
    const developer = new Developer(req.body);
    await developer.save();
    res.status(201).json(developer);
  } catch {
    sendError(res, 400, 'VALIDATION_ERROR', 'Invalid developer payload');
  }
});

export default router;