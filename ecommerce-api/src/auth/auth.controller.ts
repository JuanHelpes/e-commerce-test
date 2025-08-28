import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    @Inject()
    private readonly authService: AuthService;

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'joao.silva@example.com' },
                password: { type: 'string', example: 'senha123' },
            },
        },
    })
    signIn(@Body() body: Prisma.UserCreateInput) {
        // Logic for signing in a user
        return this.authService.signIn(body);
    }


}
