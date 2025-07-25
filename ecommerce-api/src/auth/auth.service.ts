import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class AuthService {

    @Inject()
    private readonly userService: UserService

    @Inject()
    private readonly jwtService: JwtService;

    @Inject()
    private readonly prisma: PrismaService;

    async signIn(params: Prisma.UserCreateInput): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findUnique({ where: { email: params.email } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(params.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, userId: user.id };

        return { access_token: await this.jwtService.signAsync(payload) };


    }
}
