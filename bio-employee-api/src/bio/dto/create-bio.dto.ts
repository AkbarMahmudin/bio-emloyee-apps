import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBioDto {
  @IsNotEmpty()
  @IsString()
  jobApplied: string;

  @IsNotEmpty()
  @IsString()
  ktp: string;

  @IsNotEmpty()
  @IsString()
  placeDateBirth: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  religion: string;

  @IsNotEmpty()
  @IsString()
  bloodType: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  currentAddress: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  closestPersonPhone: string;

  @IsNotEmpty()
  @IsString()
  skills: string;

  @IsNotEmpty()
  @IsBoolean()
  availableEverywhere: boolean;

  @IsNotEmpty()
  @IsInt()
  expectedSalary: number;
}
