import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyOTPDto {
  @IsNotEmpty()
  @IsMobilePhone('fa-IR')
  @ApiProperty({ example: '09304175210', description: 'شماره موبایل' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  @ApiProperty({
    example: '123456',
    description: 'کد ارسال شده به شماره موبایل',
  })
  code: string;
}
