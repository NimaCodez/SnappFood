import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  JsonWebTokenError,
  JwtService,
  JwtSignOptions,
  TokenExpiredError,
} from '@nestjs/jwt';
import { TokenTypes } from './enums/token-types.enum';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}

  async Sign(mobile: string, tokenType: TokenTypes) {
    try {
      const secret =
        tokenType === 'accessToken'
          ? process.env.JWT_ACCESS_TOKEN_SECRET
          : process.env.JWT_REFRESH_TOKEN_SECRET;

      let options: JwtSignOptions = {
        secret,
        expiresIn: '15m',
      };

      return await this.jwtService.signAsync({ mobile }, options);
    } catch (error) {
      throw error;
    }
  }

  async Verify(token: string) {
    try {
      const { payload } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_KEY_SECRET,
      });

      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException('Token expired!');
      if (error instanceof JsonWebTokenError)
        throw new UnauthorizedException('invalid token');
      throw new UnauthorizedException('invalid token');
    }
  }
}
