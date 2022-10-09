import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCardDto } from './dto/create-card.dto'

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async createCard(data: CreateCardDto) {
    const card = await this.prismaService.card.create({
      data,
    })
    return card
  }
}
