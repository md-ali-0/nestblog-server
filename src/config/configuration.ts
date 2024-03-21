import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => ({
  dBHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT, 10) || 3306,
  dbUsername: process.env.DB_USERNAME || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_DATABASE || 'my_database',
}));
