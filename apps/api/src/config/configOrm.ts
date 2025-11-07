import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as entities from '../entities';

dotenvConfig({ path: '.env' });

const db_config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: false,
  dropSchema: false,
  logging: false,
  entities: Object.values(entities),
  migrationsRun: true,
  migrations: ['dist/migrations/*.{js,ts}'],
};

export default registerAs('typeorm', () => db_config);
export const connectionSource = new DataSource(db_config as DataSourceOptions);
