import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard'
import { Card } from './card.model'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

const pubSub = new PubSub()

@Resolver()
/* @UseGuards(GqlAuthGuard) */
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(() => [Card])
  async getCards(@Args('columnId') columnId: number) {
    const cards = await this.cardService.getCards(columnId)
    return cards
  }

  @Mutation(() => Card)
  async createCard(@Args('data') data: CreateCardDto) {
    const newCard = await this.cardService.createCard(data)
    pubSub.publish('cardCreated', { cardCreated: newCard })
    return newCard
  }

  @Subscription(() => Card, {
    filter: (payload, variables) => {
      console.log({ payload, variables })
      return payload.cardCreated.columnId === variables.columnId
    },
  })
  cardCreated(@Args('columnId') columnId: number) {
    return pubSub.asyncIterator('cardCreated')
  }

  @Mutation(() => Card)
  async updateCard(@Args('data') data: UpdateCardDto) {
    const updatedCard = await this.cardService.updateCard(data)
    pubSub.publish('cardUpdated', { cardUpdated: updatedCard })
    return updatedCard
  }

  @Subscription(() => Card, {
    filter: (payload, variables) => payload.cardUpdated.cardId === variables.cardId,
  })
  cardUpdated(@Args('cardId') cardId: number) {
    return pubSub.asyncIterator('cardUpdated')
  }
}