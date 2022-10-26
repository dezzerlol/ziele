import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'
import { CommentResolver } from './comment.resolver'
import { CommentService } from './comment.service'

@Module({
  providers: [PrismaService, CommentResolver, CommentService],
  imports: [AuthModule],
})
export class CommentModule {}
