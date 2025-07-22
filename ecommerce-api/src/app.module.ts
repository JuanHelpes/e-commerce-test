import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma.service';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [AuthModule, UserModule, DatabaseModule, AddressModule, ProductModule],
  providers: [PrismaService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule { }
