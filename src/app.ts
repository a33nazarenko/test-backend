import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes';
import twilio from 'twilio';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 4000;
const MONGO_DB = process.env.MONGO_DB || '';

const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;

export const client = twilio(accountSid, authToken);

const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`Server listener ${PORT}`));
    await mongoose.connect(MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('DB connected');
    });
  } catch (error) {
    console.log('Server Error', error.message);
    process.exit(1);
  }
};

startServer();
