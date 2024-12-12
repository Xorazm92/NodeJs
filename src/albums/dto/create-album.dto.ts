import { IsBoolean, IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumDto{
    @IsString()
    @IsEmpty()
    name:string;

    @IsBoolean()
    @IsEmpty()
    grammy:boolean;
}