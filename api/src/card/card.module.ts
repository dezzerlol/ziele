import { Module } from '@nestjs/common'
import { CardService } from './card.service'
import { CardResolver } from './card.resolver'
import { PrismaService } from 'src/prisma.service'
import { AuthModule } from 'src/auth/auth.module'
import { ColumnModule } from 'src/column/column.module'

@Module({
  providers: [PrismaService, CardService, CardResolver],
  imports: [AuthModule, ColumnModule],
})
export class CardModule {}
