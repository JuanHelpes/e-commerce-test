import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    @Inject()
    private readonly prisma: PrismaService;


    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<Omit<User, 'password'> | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            select: {
                email: true,
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    }

    async getUserProducts(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            include: { products: { select: { id: true, name: true, price: true, description: true, url_image: true, url_image_2: true } } },
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        // Hash the password before saving it
        const hash = await bcrypt.hash(data.password, 10);

        return this.prisma.user.create({
            data: { ...data, password: hash },
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }

}
