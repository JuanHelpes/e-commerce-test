import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @Length(3)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João Silva',
    })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao.silva@example.com',
    })
    email: string;

    @Length(6)
    @IsAlpha()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha123',
    })
    password: string;
}
