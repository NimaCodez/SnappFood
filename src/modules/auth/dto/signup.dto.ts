import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { SignupMethods } from '../enums/signup-methods.enum';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('fa-IR')
  @ApiProperty({ example: '09304175210', description: 'User\'s Phone number' })
  mobile: string;
}
