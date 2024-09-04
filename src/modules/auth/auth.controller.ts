import { Body, Controller, Post } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { EApiConsumes } from 'src/common/enums/api-consumes.enum';
import { VerifyOTPDto } from './dto/verify-otp.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup-or-login')
  @ApiConsumes(EApiConsumes.UrlEncoded, EApiConsumes.Json)
  async SignupOrLogin(@Body() signupDto: SignupDto) {
    const { code } = await this.authService.FindUserByMobile(signupDto);

    return {
      code,
    };
  }

  @Post('verify-otp')
  @ApiConsumes(EApiConsumes.UrlEncoded, EApiConsumes.Json)
  verifyOtp(@Body() verifyOtpDtp: VerifyOTPDto) {
    return this.authService.VerifyOtp(verifyOtpDtp);
  }

  @Post('/refresh-token')
  @ApiConsumes(EApiConsumes.UrlEncoded, EApiConsumes.Json)
  RefreshToken() {}
}
