import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 7080,
  mongo: process.env.MONGO_CONNECT_STR,
  env: process.env.NODE_ENV || 'dev',
});
