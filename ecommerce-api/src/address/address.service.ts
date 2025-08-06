import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AddressService {

  @Inject()
  private readonly prisma: PrismaService;

  async addAddress(createAddressDto: CreateAddressDto, userId: string) {
    const existingAddress = await this.prisma.address.findFirst({
      where: { userId: userId }
    });
    if (existingAddress) {
      return await this.prisma.address.update({
        where: { id: existingAddress.id },
        data: { ...createAddressDto, userId },
      });

    } else {
      // If no existing address, create a new one
      return await this.prisma.address.create({
        data: { ...createAddressDto, userId },
      });
    }
  }

  async create(createAddressDto: CreateAddressDto, userId: string) {
    return await this.prisma.address.create({
      data: { ...createAddressDto, userId },
    });
  }

  findAll() {
    return `This action returns all address`;
  }

  async findOne(id: string) {
    return await this.prisma.address.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    return await this.prisma.address.update({
      where: { id: id },
      data: updateAddressDto,
    });
  }

  remove(id: number) {
    return this.prisma.address.delete({
      where: { id: id.toString() },
    });
  }
}
