import { Controller, Body, Post, Get, Param, Patch, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'generated/prisma';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('create')
    async createUser(@Body(new ValidationPipe()) data: CreateUserDto): Promise<User> {
        return this.userService.createUser(data);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<Omit<User, 'password'> | null> {
        return this.userService.user({ id });
    }

    @UseGuards(AuthGuard)
    @Get('products/:id')
    async getUserProducts(@Param('id') id: string) {
        return this.userService.getUserProducts(id);
    }

    @UseGuards(AuthGuard)
    @Get('address/:id')
    async getUserAddress(@Param('id') id: string) {
        return this.userService.getUserAddress(id);
    }

    @UseGuards(AuthGuard)
    @Delete('removeProduct/:id/:productId')
    async removeUserProduct(@Param('id') id: string, @Param('productId') productId: string) {
        return this.userService.removeUserProduct(id, productId);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: UpdateUserDto,
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
