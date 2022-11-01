import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProjectService } from 'src/project/project.service'
import { ICurrentUser } from 'src/users/user.decorator'
import { CreateColumnDto } from './dto/create-column.dto'
import { GetColumnsDto } from './dto/get-columns.dto'

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService, private projectSerivce: ProjectService) {}

  async createColumn(data: CreateColumnDto) {
    try {
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
    } catch (error) {
      throw new HttpException('Column with this name already exists.', HttpStatus.BAD_REQUEST)
    }
  }

  async getProjectColumns(data: GetColumnsDto, reqUser: ICurrentUser) {
    const project = await this.projectSerivce.getProject(data.teamTitle, data.projectId, reqUser)
    return project.columns
  }

  async getColumn(id: string) {
    const column = await this.prisma.column.findUnique({
      where: {
        id,
      },
      include: {
        cards: true,
      },
    })

    return column
  }

  async updateColumn(id: string, newTitle: string) {
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

  async deleteColumn(id: string) {
    try {
      const column = await this.prisma.column.delete({
        where: {
          id,
        },
      })
      return { status: HttpStatus.OK, message: 'Column deleted.' }
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
    }
  }
}
