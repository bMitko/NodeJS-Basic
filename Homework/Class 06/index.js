import express from 'express';
import BookRouter from './routes/book.routes.js'; 
import StatsRouter from './routes/stats.routes.js';
import logger from './middlewares/logger.middlewares.js';

const PORT = 3000;
const HOSTNAME = 'localhost';

const app = express();

app.use(express.json());
app.use(logger);

app.use('/books', BookRouter);
app.use('/stats', StatsRouter);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is now listening at: http://${HOSTNAME}:${PORT}`);
});



