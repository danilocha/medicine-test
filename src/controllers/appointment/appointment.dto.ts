import { IsDateString, IsString } from 'class-validator';

export class AppointmentDTO {
  @IsString({ message: 'bio should be a string' })
  description: string;

  @IsString({ message: 'id should be a string' })
  typedateid: string;
  @IsString({ message: 'id should be a string' })
  doctorid: string;
  @IsString({ message: 'id should be a string' })
  patientid: string;
  @IsDateString()
  duedate: string;
}
