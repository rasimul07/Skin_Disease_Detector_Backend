"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
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
