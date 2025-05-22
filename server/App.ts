import productRouter from './routes/productRoute.ts';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors());


app.use('/products', productRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: err.message});
    }
    })


app.listen(3000, () => console.log('listening to 3000...'))
