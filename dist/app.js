"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./db");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5789;
const auth_1 = __importDefault(require("./routes/auth"));
const image_1 = __importDefault(require("./routes/image"));
const user_1 = __importDefault(require("./routes/user"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('src/public'));
app.use("/auth", auth_1.default);
app.use("/photo", image_1.default);
app.use("/user", user_1.default);
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
