export interface Configs {
  PORT: number;
  DATABASE_URL: string;
  EMAIL_HOST: string;
  EMAIL_PORT: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  REDIS_URL: string;
  APP_MODE: string;
  JWT_SECRET: string;
}
export default (): Configs => ({
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  REDIS_URL: process.env.REDIS_URL,
  APP_MODE: process.env.APP_MODE,
  JWT_SECRET: process.env.JWT_SECRET,
});
