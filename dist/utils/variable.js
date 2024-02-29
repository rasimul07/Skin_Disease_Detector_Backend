"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.TOKEN_SECRET = exports.PORT = exports.DATABASE_URL = void 0;
const { env } = process;
exports.DATABASE_URL = env.DATABASE_URL, exports.PORT = env.PORT, exports.TOKEN_SECRET = env.TOKEN_SECRET, exports.CLOUDINARY_CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME, exports.CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY, exports.CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET;
