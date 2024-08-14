import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/config/typeorm.config';
import { AppController } from './app.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig()), CategoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
