import dotenv from 'dotenv';

dotenv.config();
const imageFolder = process.env.IMAGE_FOLDER;
if (!imageFolder) throw new Error('Please set image folder environment variable');

const dbUri = process.env.MONGODB_URI;
if (!dbUri) throw new Error('Please set database URI environment variable');

const dbName = process.env.MONGODB_NAME;
if (!dbName) throw new Error('Please set database name environment variable');

const JWT = process.env.JWT_SECRET;
if (!JWT) throw new Error('Please set JWT secret key environment variable');

const NAME = process.env.NAME;
if (!NAME) throw new Error('Please set name environment variable');

const PASSWORD = process.env.PASSWORD;
if (!PASSWORD) throw new Error('Please set password environment variable');

const port = Number(process.env.PORT || 8000);

const host = process.env.HOST || '127.0.0.1';

export default {
    imageFolder,
    port,
    dbUri,
    dbName,
    host,
    JWT,
    NAME,
    PASSWORD
};
