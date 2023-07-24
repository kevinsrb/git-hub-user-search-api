import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';


export class CreateUserDto {

   
    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    @MinLength(1)
    login: string;

    @IsString()
    @MinLength(1)
    avatar_url: string;

}
