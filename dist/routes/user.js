"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllars/user");
const auth_1 = require("../middleware/auth");
const fileParser_1 = require("../middleware/fileParser");
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.put("/update-profile-picture", auth_1.mustAuth, fileParser_1.fileParser, user_1.updateProfile);
exports.default = router;
