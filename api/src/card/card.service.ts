import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async getCards(columnId: string) {
    const cards = await this.prismaService.card.findMany({
      where: {
        columnId,
      },
    })
    return cards
  }

  async createCard(data: CreateCardDto) {
    const card = await this.prismaService.card.create({
      data: {
        title: data.title,
        columnId: data.columnId,
        description: data.description,
        priority: data.priority,
        tags: {
          connect: data.tags && data.tags.map((tag) => ({ id: tag })),
        },
        assignees: {
          connect: data.assignees && data.assignees.map((assignee) => ({ id: assignee })),
        },
      },
      include: {
        tags: true,
      },
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
