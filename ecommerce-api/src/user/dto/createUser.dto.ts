import { IsAlpha, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @Length(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(6)
    @IsAlpha()
    @IsNotEmpty()
    password: string;
}
