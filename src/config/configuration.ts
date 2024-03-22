import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => ({
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT, 10) || 3306,
  dbUser: process.env.DB_USER || 'root',
  dbPass: process.env.DB_PASS || '',
  dbName: process.env.DB_NAME || 'test',
}));
