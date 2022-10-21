import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { TeamModule } from 'src/team/team.module';
import { UsersModule } from 'src/users/users.module';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  providers: [PrismaService, ProjectService, ProjectResolver],
  imports: [AuthModule, UsersModule, TeamModule],
  exports: [ProjectService],
})
export class ProjectModule {}
