export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsBoolean()
    grammy: boolean;
  }
