import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DefaultResponse } from 'src/common/defaultResponse.dto'
import { ProjectGuard } from 'src/project/project.guard'
import { CurrentUser, ICurrentUser } from 'src/users/user.decorator'
import { Column } from './column.model'
import { ColumnService } from './column.service'
import { CreateColumnDto } from './dto/create-column.dto'
import { GetColumnsDto } from './dto/get-columns.dto'

@Resolver()
@UseGuards(ProjectGuard)
export class ColumnResolver {
  constructor(private columnService: ColumnService) {}

  @Query(() => [Column])
  async getProjectColumns(@Args('data') data: GetColumnsDto, @CurrentUser() reqUser: ICurrentUser) {
    return this.columnService.getProjectColumns(data, reqUser)
  }

  @Mutation(() => Column)
  async createColumn(@Args('data') data: CreateColumnDto) {
    return this.columnService.createColumn(data)
  }

  @Mutation(() => Column)
  async updateColumn(@Args('id') id: string, @Args('newTitle') newTitle: string) {
    return this.columnService.updateColumn(id, newTitle)
  }

  @Mutation(() => DefaultResponse)
  async deleteColumn(@Args('columnId') columnId: string, @Args('projectId') projectId: string) {
    return this.columnService.deleteColumn(columnId)
  }
}
