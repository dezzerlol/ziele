import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async getCards(columnId: number) {
    const cards = await this.prismaService.card.findMany({
      where: {
        columnId,
      },
    })
    return cards
  }

  async createCard(data: CreateCardDto) {
    const card = await this.prismaService.card.create({
      data,
    })
    return card
  }

  async updateCard(data: UpdateCardDto) {
    const card = await this.prismaService.card.update({
      where: {
        id: data.cardId,
      },
      data,
    })
    return card
  }
}
