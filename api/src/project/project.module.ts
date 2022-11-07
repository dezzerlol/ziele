import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { ColumnModule } from 'src/column/column.module'
import { PrismaService } from 'src/prisma.service'
import { TeamModule } from 'src/team/team.module'
import { UsersModule } from 'src/users/users.module'
import { ProjectResolver } from './project.resolver'
import { ProjectService } from './project.service'

@Module({
  providers: [PrismaService, ProjectService, ProjectResolver],
  imports: [AuthModule, UsersModule, forwardRef(() => TeamModule), forwardRef(() => ColumnModule)],
  exports: [ProjectService],
})
export class ProjectModule {}
