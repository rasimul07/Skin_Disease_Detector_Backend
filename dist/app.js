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
const user_1 = __importDefault(require("#/routes/user"));
const variable_1 = require("#/utils/variable");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", user_1.default);
if (variable_1.DATABASE_URL) {
    exports.conn = mongoose_1.default.connect(variable_1.DATABASE_URL);
    console.log("connect server using mongoose successfully");
}
else {
    console.log("server url undefined");
}
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
