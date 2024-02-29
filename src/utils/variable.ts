const { env } = process as { env: { [key: string]: string } };
export const {
  DATABASE_URL,
  PORT,
  TOKEN_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = env;
