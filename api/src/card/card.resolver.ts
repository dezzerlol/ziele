import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard'
import { Card } from './card.model'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'

const pubSub = new PubSub()

@Resolver()
/* @UseGuards(GqlAuthGuard) */
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Mutation(() => Card)
  async createCard(@Args('data') data: CreateCardDto) {
    const newCard = await this.cardService.createCard(data)
    pubSub.publish('cardCreated', { cardCreated: newCard })
    return newCard
  }

  @Subscription(() => Card, {
    filter: (payload, variables) => payload.cardCreated.columnId === variables.columnId,
  })
  cardCreated(@Args('columnId') columnId: number) {
    return pubSub.asyncIterator('cardCreated')
  }
}
