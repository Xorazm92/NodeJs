import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsString()
  room: string;
}
