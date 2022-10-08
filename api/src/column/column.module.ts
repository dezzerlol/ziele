import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnResolver } from './column.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, ColumnService, ColumnResolver], 
  imports: [AuthModule]
})
export class ColumnModule {}
