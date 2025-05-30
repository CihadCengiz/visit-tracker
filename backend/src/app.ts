import express, { Request, Response, NextFunction } from 'express';
import countryRoutes from './routes/country.js';
import cors from 'cors';

// Initialize Express application
export const app = express();

/* ───── Core middleware ─────────────────────────────────────────────────── */
app.disable('x-powered-by'); // Disable 'x-powered-by' header for security
app.use(express.json());
app.use(cors({ origin: '*' }));

/* ───── Routes ─────────────────────────────────────────────────── */
app.use('/api', countryRoutes);

// Health check endpoint for Docker
app.get('/healthz', (_req, res) => { res.send('ok'); });

// Fallback 404 handler for unmatched routes
app.use((_req, res) => { res.status(404).json({ message: 'Not found' }); });

/* ───── Global error handler ─────────────────────────────────────────────────── */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});
