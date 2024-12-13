import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateTrackDto {
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    artistId?: string;
  
    @IsOptional()
    @IsString()
    albumId?: string;
  
    @IsNumber()
    @Min(0)
    duration: number;
  }
