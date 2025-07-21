import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from 'generated/prisma';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {

  @Inject()
  private readonly prisma: PrismaService;

  create(createProductDto: CreateProductDto) {
    const data = { ...createProductDto, userId: null };
    return this.prisma.product.create({
      data,
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      where: {
        userId: null,
      }
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    if (updateProductDto.userId) {
      updateProductDto.userId = new ObjectId(updateProductDto.userId) as any; // Convert string to ObjectId if necessary
    }
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
