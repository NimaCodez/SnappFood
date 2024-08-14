import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig())],
  controllers: [],
  providers: [],
})
export class AppModule {}
