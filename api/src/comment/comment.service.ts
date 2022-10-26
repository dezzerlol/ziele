import { Injectable } from '@nestjs/common'
import { AddCommentDto } from './dto/add-comment.dto'

@Injectable()
export class CommentService {
  async addComment(data: AddCommentDto) {
    console.log('dtea')
  }
}
