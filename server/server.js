
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', Router);

const PORT = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@ac-gyensgu.ettjroa.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce-web`;


Connection(URL);

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, () => console.log(`server is running successfully on PORT ${PORT} `));

DefaultData();