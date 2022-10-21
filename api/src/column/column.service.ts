import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProjectService } from 'src/project/project.service'
import { ICurrentUser } from 'src/users/user.decorator'
import { CreateColumnDto } from './dto/create-column.dto'
import { GetColumnsDto } from './dto/get-columns.dto'

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService, private projectSerivce: ProjectService) {}

  async createColumn(data: CreateColumnDto) {
    const column = await this.prisma.column.create({
      data: {
        title: data.title,
        Project: {
          connect: {
            id: data.projectId,
          },
        },
      },
    })
    return column
  }

  async getProjectColumns(data: GetColumnsDto, reqUser: ICurrentUser) {
    const project = await this.projectSerivce.getProject(data.teamTitle, data.projectTitle, reqUser)
    return project.columns
  }

  async updateColumn(id: number, newTitle: string) {
    const column = await this.prisma.column.update({
      where: {
        id,
      },
      data: {
        title: newTitle,
      },
    })

    return column
  }
}
