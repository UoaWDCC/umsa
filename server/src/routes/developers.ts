import { Router, Request, Response } from 'express';
import Developer, { IDeveloperDocument } from '../models/Developer';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (err) {
    res.status(500).json({ message: 'oh hell nah' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) return res.status(404).json({ message: 'oh hell nah' });
    res.json(developer);
  } catch (err) {
    res.status(500).json({ message: 'oh hell nah' });
  }
});

router.post('/', async (req: Request<{}, {}, IDeveloperDocument>, res: Response) => {
  try {
    const developer = new Developer(req.body);
    await developer.save();
    res.status(201).json(developer);
  } catch (err) {
    res.status(400).json({ message: 'oh hell nah' });
  }
});

export default router;