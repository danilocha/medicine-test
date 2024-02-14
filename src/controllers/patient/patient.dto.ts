import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class PatientDTO {
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MaxLength(255, { message: 'Name should not exceed 255 characters' })
  name: string;

  @IsString({ message: 'bio should be a string' })
  bio: string;
}
