import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 120)
  @Matches(/^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/, {
    message: 'fullName must contain first name and last name.',
  })
  fullName: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEmail({}, { each: true })
  emails: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Length(8, 20, { each: true })
  phones: string[];

  @IsOptional()
  @IsDateString()
  registrationDate?: Date;
}
