"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const currentDir = dirname(fileURLToPath(import.meta.url));
// console.log(currentDir);
console.log(__dirname);
console.log(path_1.default.join(__dirname, '../../photos/myFile.jpg'));
dotenv_1.default.config();
const DATABASE_URL = process.env.DATABASE_URL;
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    yourScans: {
        type: [String],
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
});
exports.User = mongoose_1.default.model("User", UserSchema);
// import { User } from './db/db';
// import { MongoClient } from 'mongodb';
// export let UserImages : mongoose.mongo.BSON.Document;
// if (DATABASE_URL) {
//   const client = new MongoClient(DATABASE_URL);
//   const dbName = 'SkinDisease'
//   async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     UserImages = db.collection('UserImages');
//     // the following code examples can be pasted here...
//     const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'myCustomBucket' });
//     fs.createReadStream(path.join(__dirname,'../../photos/myFile.jpg')).
//      pipe(bucket.openUploadStream('myFile', {
//          chunkSizeBytes: 1048576,
//          metadata: { field: 'myField', value: 'myValue' }
//      }));
//     return 'done.';
//   }
//   main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
// } else {
//   console.error('DATABASE_URL is not defined');
// }
// import mongoose from 'mongoose';
// import path from 'path';
// import Grid from 'gridfs-stream'
// Grid.mongo = mongoose.mongo
