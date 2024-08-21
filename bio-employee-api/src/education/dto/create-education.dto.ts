import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  major: string;

  @IsNotEmpty()
  @IsString()
  graduatedAt: string;

  @IsOptional()
  @IsNumber()
  gpa: number;
}
