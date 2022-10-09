import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard'
import { Column } from './column.model'
import { ColumnService } from './column.service'
import { CreateColumnDto } from './dto/create-column.dto'

@Resolver()
/* @UseGuards(GqlAuthGuard) */
export class ColumnResolver {
  constructor(private columnService: ColumnService) {}

  @Query(() => [Column])
  async getProjectColumns(@Args('projectId') projectId: number) {
    return this.columnService.getProjectColumns(projectId)
  }

  @Mutation(() => Column)
  async createColumn(@Args('data') data: CreateColumnDto) {
    return this.columnService.createColumn(data)
  }

  @Mutation(() => Column)
  async updateColumn(@Args('id') id: number, @Args('newTitle') newTitle: string) {
    return this.columnService.updateColumn(id, newTitle)
  }
}
