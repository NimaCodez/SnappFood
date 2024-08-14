import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { join } from 'path';
configDotenv({ path: join(process.cwd(), '.env') });

export function TypeORMConfig(): TypeOrmModuleOptions {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;
  return {
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USERNAME,
    password: String(DB_PASSWORD),
    database: DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  };
}
