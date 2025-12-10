import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import documentRoute from './routes/documentRoute.js'

dotenv.config();

const app =express();

app.use(cors());
app.use(express.json())

app.use('/documents',documentRoute);

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
