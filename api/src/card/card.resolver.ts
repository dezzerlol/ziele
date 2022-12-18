import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard'
import { Column } from 'src/column/column.model'
import { ColumnService } from 'src/column/column.service'
import { DefaultResponse } from 'src/common/defaultResponse.dto'
import { CARD_CREATED, CARD_MOVED, CARD_UPDATED } from 'src/constants/subscriptions.const'
import { Card } from './card.model'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

const pubSub = new PubSub()

@Resolver()
/* @UseGuards(GqlAuthGuard) */
export class CardResolver {
  constructor(private cardService: CardService, private columnService: ColumnService) {}

  @Query(() => [Card])
  async getCards(@Args('columnId') columnId: string) {
    const cards = await this.cardService.getCards(columnId)
    return cards
  }

  @Query(() => Card)
  async getCard(@Args('cardId') cardId: string) {
    const card = await this.cardService.getCard(cardId)
    return card
  }

  @Mutation(() => Card)
  async createCard(@Args('data') data: CreateCardDto) {
    const newCard = await this.cardService.createCard(data)
    pubSub.publish(CARD_CREATED, { cardCreated: newCard })
    return newCard
  }

  @Subscription(() => Card, {
    filter: (payload, variables) => payload.cardCreated.columnId === variables.columnId,
  })
  cardCreated(@Args('columnId') columnId: string) {
    return pubSub.asyncIterator(CARD_CREATED)
  }

  @Mutation(() => Card)
  async updateCard(@Args('data') data: UpdateCardDto) {
    const updatedCard = await this.cardService.updateCard(data)
    pubSub.publish(CARD_UPDATED, { cardUpdated: updatedCard })
    return updatedCard
  }

  @Subscription(() => Card, {
    filter: (payload, variables) => payload.cardUpdated.cardId === variables.cardId,
  })
  cardUpdated(@Args('cardId') cardId: string) {
    return pubSub.asyncIterator(CARD_UPDATED)
  }

  @Mutation(() => DefaultResponse)
  async deleteCard(@Args('cardId') cardId: string) {
    const response = await this.cardService.deleteCard(cardId)
    return response
  }

  @Mutation(() => Column)
  async moveCardToColumn(
    @Args('cardId') cardId: string,
    @Args('newIndex') newIndex: number,
    @Args('columnId') columnId: string,
    @Args('projectId') projectId: string
  ) {
    const card = await this.cardService.moveCardToColumn(cardId, newIndex, columnId)
    return card
  }
}
