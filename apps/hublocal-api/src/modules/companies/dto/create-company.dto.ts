import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  cnpj: string;
}
