const dotenv = require('dotenv');
const origins = require('./origins');
dotenv.config();

module.exports = {
    mongoUrl: process.env.MONGO_URL,
    secretKey: process.env.SECRET_KEY,
    accessTokenSecret: process.env.ACCESS_TOKEN,
    refreshTokenSecret: process.env.REFRESH_TOKEN,
    port: process.env.PORT,
    baseLink: process.env.LINK,
    cookieParserSecret: process.env.COOKIE_PARSER_SECRET,
    origins,
};
