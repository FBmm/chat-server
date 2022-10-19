import { IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  pass: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  passSalt: string;
}
