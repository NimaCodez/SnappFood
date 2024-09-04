import { Injectable } from '@nestjs/common';

@Injectable()
export class OTPService {
  Generate() {
    return Math.floor(Math.random() * 900000 + 100000);
  }

  GetExpiryTime(expiryTime: number) {
    return new Date(new Date().getTime() + 1000 * expiryTime * 60);
  }
}
