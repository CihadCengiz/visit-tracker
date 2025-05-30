import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { incrCountry, getAllStats } from '../helpers/redisCounters.js';

const router = Router();

// POST /api/updateCountryCount
// Validate 'countryCode' as ISO-3166 alpha-2
router.post(
    '/updateCountryCount',
    body('countryCode')
        .isISO31661Alpha2()
        .withMessage('countryCode must be ISO-3166 alpha-2 (e.g., US, DE)'),

    async (req: Request<{}, {}, { countryCode: string; }>, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        // Increment country count in Redis and respond with total
        const total = await incrCountry(req.body.countryCode);
        res.status(202).json({ total });
    }
);

// GET /api/getCountryStats
// Retrieve all country stats from Redis
router.get('/getCountryStats', async (_req: Request, res: Response) => {
    try {
        const stats = await getAllStats();
        res.status(200).json(stats);
    } catch (err) {
        console.error('Error retrieving country stats:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
