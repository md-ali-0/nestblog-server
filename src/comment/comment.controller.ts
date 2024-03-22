import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

interface commentData {
  comment: string;
  name: string;
  authorImage: string;
  postId: number;
  email: string;
}

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  findAllComments(): Promise<Comment[]> {
    return this.commentService.findAll();
  }
  @Get('/details/:id')
  findOne(@Req() req: Request): Promise<Comment> {
    const id = parseInt(req.params.id);
    return this.commentService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/by-post/:id')
  findAllCommentsByPost(@Req() req: Request): Promise<Comment[]> {
    const id = parseInt(req.params.id);
    return this.commentService.findAllByPostID(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/create')
  createComment(@Body() comment: commentData): Promise<Comment> {
    return this.commentService.create(comment);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/update/:id')
  updatePost(
    @Param() id: number,
    @Body() comment: Partial<Comment>,
  ): Promise<Comment> {
    return this.commentService.update(id, comment);
  }
}
