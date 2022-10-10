import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnResolver } from './column.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { ProjectModule } from 'src/project/project.module';

@Module({
  providers: [PrismaService, ColumnService, ColumnResolver], 
  imports: [AuthModule, ProjectModule]
})
export class ColumnModule {}
