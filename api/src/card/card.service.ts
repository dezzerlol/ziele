import { HttpStatus, Injectable } from '@nestjs/common'
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

  async getCard(cardId: string) {
    const card = await this.prismaService.card.findUnique({
      where: {
        id: cardId,
      },
      include: {
        assignees: {
          select: {
            id: true,
            avatar: true,
            username: true,
          },
        },
        column: true,
        comments: true,
        tags: true,
      },
    })
    return card
  }

  async createCard(data: CreateCardDto) {
    const card = await this.prismaService.card.create({
      data: {
        title: data.title,
        columnId: data.columnId,
        description: data.description,
        priority: data.priority,
        issueType: data.issueType,
        index: data.index,
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

  async deleteCard(cardId: string) {
    const card = await this.prismaService.card.delete({
      where: {
        id: cardId,
      },
    })
    return { status: HttpStatus.OK, message: 'Card deleted successfully' }
  }

  async moveCardToColumn(cardId: string, columnId: string) {
    const card = await this.prismaService.card.update({
      where: {
        id: cardId,
      },
      data: {
        column: {
          connect: {
            id: columnId,
          },
        },
      },

      include: {
        tags: true,
      },
    })

    return card
  }
}
