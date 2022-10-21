import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PrismaService, TeamService, TeamResolver],
  imports: [AuthModule, UsersModule],
  exports: [TeamService],
})
export class TeamModule {}
