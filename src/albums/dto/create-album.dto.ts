import { IsBoolean, IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumDto {
    @IsString()
    name: string;
  
    @IsNumber()
    @Min(1900)
    @Max(new Date().getFullYear())
    year: number;
  
    @IsOptional()
    @IsString()
    artistId?: string;
  }