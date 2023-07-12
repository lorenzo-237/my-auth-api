export const APP_PORT = parseInt(process.env.APP_PORT);
export const SESSION_NAME = 'NESTJS_SESSION_ID';
export const SESSION_SALT = process.env.SESSION_SALT;
export const SESSION_MAX_AGE = 5 * 60 * 1000;
