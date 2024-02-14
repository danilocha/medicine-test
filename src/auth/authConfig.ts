const { auth } = require('express-oauth2-jwt-bearer');
const config = require('config');
const appConfig = config;
const authConfig = appConfig['auth'];

export const checkJwt = auth(authConfig);
