import express from 'express';
import cors from 'cors';
import stripeRouter from './routes/stripe.js'

const app = express();

app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(express.json());

app.use('/api/stripe', stripeRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Server is listening on port', PORT))









