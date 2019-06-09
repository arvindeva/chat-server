const config = {
  APP_PORT: '4000',
  NODE_ENV: 'development',
  DB_USERNAME: 'admin',
  DB_PASSWORD: 'r2d2c3po',
  DB_HOST: 'ds235437.mlab.com',
  DB_PORT: '35437',
  DB_NAME: 'chat-me'
};

const IN_PROD = config.NODE_ENV === 'production';
config.IN_PROD = IN_PROD;

module.exports = { config };
