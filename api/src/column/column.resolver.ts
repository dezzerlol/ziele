import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProjectGuard } from 'src/project/project.guard'
import { Column } from './column.model'
import { ColumnService } from './column.service'
import { CreateColumnDto } from './dto/create-column.dto'
import { GetColumnsDto } from './dto/get-columns.dto'

@Resolver()
@UseGuards(ProjectGuard)
export class ColumnResolver {
  constructor(private columnService: ColumnService) {}

  @Query(() => [Column])
  async getProjectColumns(@Args('data') data: GetColumnsDto) {
    return this.columnService.getProjectColumns(data)
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
