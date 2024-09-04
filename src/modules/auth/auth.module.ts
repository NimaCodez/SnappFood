import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTService } from './jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from './entity/otp.entity';
import { User } from '../user/entities/user.entity';
import { OTPService } from './otp.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([OTP, User])],
  controllers: [AuthController],
  providers: [AuthService, JWTService, OTPService, JwtService],
})
export class AuthModule {}
