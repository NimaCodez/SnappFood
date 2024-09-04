import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('fa-IR')
  @ApiProperty({ example: '09304175210', description: 'User\'s Phone number' })
  mobile: string;
}
