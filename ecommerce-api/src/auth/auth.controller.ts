import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    @Inject()
    private readonly authService: AuthService;

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() body: Prisma.UserCreateInput) {
        // Logic for signing in a user
        return this.authService.signIn(body);
    }


}
