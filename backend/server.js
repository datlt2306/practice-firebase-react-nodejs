import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { readdirSync } from 'fs';
require('dotenv').config();

// Router


const app = express();
mongoose.connect(process.env.DATABASE)
    .then(() => console.log('DB Connected'))
    .catch(error => console.log('DB not connected ', error))

// middleware
app.use(morgan("tiny"));
app.use(express.json())
app.use(cors())


// Route
readdirSync('./routes').map(route => app.use("/api", require(`./routes/${route}`)))

const port = process.env.PORT || 8000;

app.listen(port, () => console.log('server is listening port: ', port))