import { Controller, Body, Post, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from 'generated/prisma';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('create')
    async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
        return this.userService.createUser(data);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User | null> {
        return this.userService.user({ id });
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() data: Prisma.UserUpdateInput,
    ): Promise<User> {
        return this.userService.updateUser({
            where: { id },
            data,
        });
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser({ id });
    }

}
