import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 120)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  phone: string;

  @IsUUID()
  clientId: string;
}
