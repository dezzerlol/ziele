import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PrismaService, ProjectService, ProjectResolver],
  imports: [AuthModule]
})
export class ProjectModule {}
