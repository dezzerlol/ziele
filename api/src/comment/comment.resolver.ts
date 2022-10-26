import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { DefaultResponse } from 'src/common/defaultResponse.dto'
import { CommentService } from './comment.service'
import { AddCommentDto } from './dto/add-comment.dto'

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Mutation(() => DefaultResponse)
  async addComment(@Args('data') data: AddCommentDto) {
    return this.commentService.addComment(data)
  }
}
