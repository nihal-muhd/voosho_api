import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import adminRouter from './routes/admin/admin.js';
import userRouter from './routes/user/user.js';


// Load environment variables from .env file
dotenv.config();

// connect to database
connectDB()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/user', userRouter)


// start the server
app.listen(port, () => console.log(`server started at ${port}`))