import 'dotenv/config';
import http from 'http';
import { app } from './app.js';
import { redisClient } from './redis/redis.js';

const port = Number(process.env.EXPRESS_PORT) || 3001;
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`🚀  API ready at http://localhost:${port}`);
});

// Graceful shutdown handler to close Redis connection and HTTP server
const shutdown = async (sig: string) => {
  console.log(`${sig} received — shutting down…`);
  try { await redisClient.quit(); } catch (_) { }
  server.close(() => {
    console.log('HTTP server closed');
    process.exitCode = 0;
  });
};

// Listen for termination signals to trigger graceful shutdown
['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, () => shutdown(sig)));

// Handle unhandled promise rejections globally
process.on('unhandledRejection', err => {
  console.error('Unhandled promise rejection:', err);
});
