export default () => ({
  DATABASE_URL: String(process.env.DATABASE_URL),
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  REDIS_URL: process.env.REDIS_URL,
  APP_MODE: process.env.APP_MODE,
});
