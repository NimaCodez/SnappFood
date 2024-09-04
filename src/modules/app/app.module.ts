import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/config/typeorm.config';
import { AppController } from './app.controller';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig()), CategoryModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
