import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  providers: [PrismaService, UsersService, UsersResolver],
  imports: [forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
