import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class SpecialtyDTO {
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MaxLength(255, { message: 'Name should not exceed 255 characters' })
  name: string;

  @IsString({ message: 'Description should be a string' })
  description: string;
}
