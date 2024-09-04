import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { OTPService } from './otp.service';
import { OTP } from './entity/otp.entity';
import { VerifyOTPDto } from './dto/verify-otp.dto';
import { JWTService } from './jwt.service';
import { TokenTypes } from './enums/token-types.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(OTP) private otpRepo: Repository<OTP>,
    private otpService: OTPService,
    private jwtService: JWTService,
  ) {}

  async FindUserByMobile(SignupDto: SignupDto) {
    const { mobile } = SignupDto;
    const user = await this.userRepo.findOneBy({ mobile });

    if (!user) return await this.Signup(mobile);
    else return await this.Login(user);
  }

  async Signup(mobile: string) {
    let user = this.userRepo.create({ mobile });
    user = await this.userRepo.save(user);

    let otp = this.otpRepo.create({
      code: this.otpService.Generate().toString(),
      expires_in: this.otpService.GetExpiryTime(2),
      user_id: user.id,
    });
    otp = await this.otpRepo.save(otp);

    await this.userRepo.update({ id: user.id }, { otp_id: otp.id });

    return {
      code: otp.code,
    };
  }

  async Login(user: User) {
    let otp = await this.otpRepo.findOneBy({ user_id: user.id });
    if (otp && new Date() < otp.expires_in)
      throw new BadRequestException('You can have one code every 2 minutes.');

    await this.otpRepo.update(
      { id: user.otp_id },
      {
        code: this.otpService.Generate().toString(),
        expires_in: this.otpService.GetExpiryTime(2),
      },
    );

    return {
      code: (await this.otpRepo.findOneBy({ user_id: user.id })).code,
    };
  }

  private async GenerateTokens(phoneNumber: string): Promise<[string, string]> {
    return await Promise.all([
      this.jwtService.Sign(phoneNumber, TokenTypes.AccessToken),
      this.jwtService.Sign(phoneNumber, TokenTypes.RefreshToken),
    ]);
  }

  async VerifyOtp(verifyOtpDto: VerifyOTPDto) {
    const { code, phoneNumber } = verifyOtpDto;
    const otp = await this.otpRepo.findOneBy({ code });
    if (!otp || otp.used || new Date() > otp.expires_in)
      throw new BadRequestException('Invalid or expired OTP');

    const user = await this.userRepo.findOne({
      where: {
        id: otp.user_id,
      },
    });
    if (!user) throw new BadRequestException('User not found');

    if (user.mobile !== phoneNumber || code !== otp.code)
      throw new BadRequestException('Invalid OTP');

    const [accessToken, refreshToken] = await this.GenerateTokens(phoneNumber);
    await this.otpRepo.update({ id: otp.id }, { used: true });

    return {
      accessToken,
      refreshToken,
    };
  }
}
