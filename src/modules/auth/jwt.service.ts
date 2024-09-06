import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  JsonWebTokenError,
  JwtService,
  JwtSignOptions,
  TokenExpiredError,
} from '@nestjs/jwt';
import { ENV_VARS } from 'src/common/envs/env-vars';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}

  async signAccessToken(phoneNumber: string) {
    try {
      const signOptions: JwtSignOptions = {
        secret: ENV_VARS.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: ENV_VARS.ACCESS_TOKEN_EXPIRY_TIME,
      };

      const accessToken = await this.jwtService.signAsync(
        { mobile: phoneNumber },
        signOptions,
      );

      return accessToken;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async signRefreshToken(phoneNumber: string) {
    try {
      const signOptions: JwtSignOptions = {
        secret: ENV_VARS.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: ENV_VARS.REFRESH_TOKEN_EXPIRY_TIME,
      };

      const refreshToken = await this.jwtService.signAsync(
        { mobile: phoneNumber },
        signOptions,
      );

      return refreshToken;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async verifyAccessToken(token: string) {
    try {
      const { payload } = await this.jwtService.verifyAsync(token, {
        secret: ENV_VARS.JWT_ACCESS_TOKEN_SECRET,
      });

      if (payload) return payload;
      else throw new UnauthorizedException('invalid token');
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException('Token expired!');
      if (error instanceof JsonWebTokenError)
        throw new UnauthorizedException('invalid token');
      throw new UnauthorizedException('invalid token');
    }
  }

  async verifyRefreshToken(token: string) {
    try {
      const { payload } = await this.jwtService.verifyAsync(token, {
        secret: ENV_VARS.JWT_REFRESH_TOKEN_SECRET,
      });

      if (payload) return payload;
      else throw new UnauthorizedException('invalid token');
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException('Token expired!');
      if (error instanceof JsonWebTokenError)
        throw new UnauthorizedException('invalid token');
      throw new UnauthorizedException('invalid token');
    }
  }
}
