"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', user_1.default);
if (DATABASE_URL) {
    exports.conn = mongoose_1.default.connect(DATABASE_URL);
    console.log('connect server using mongoose successfully');
}
else {
    console.log('server url undefined');
}
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
