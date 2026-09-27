import { resolve } from 'node:path';
import cors from 'cors';
import express from 'express';
import routes from './routes.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/category-file', express.static(resolve(process.cwd(), 'uploads')));
app.use('/product-file', express.static(resolve(process.cwd(), 'uploads')));
app.use(routes);

export default app;
