import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/config/typeorm.config';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig())],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
