import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { Post as PostEntry } from './post.entity';
import { PostService } from './post.service';

interface QueryParameters {
  page?: string;
  size?: string;
}

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  findAllPosts(@Query() query: QueryParameters): Promise<PostEntry[]> {
    return this.postService.findAll(query);
  }
  @HttpCode(HttpStatus.OK)
  @Get('/total')
  totalPosts(): Promise<number> {
    return this.postService.findTotal();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/details/:id')
  findOnePost(@Req() req: Request): Promise<PostEntry> {
    const id = parseInt(req.params.id);
    return this.postService.findOne(id);
  }
  @HttpCode(HttpStatus.OK)
  @Get('/category/:name')
  findAllPostByCategory(@Req() req: Request): Promise<PostEntry[]> {
    const categoryName = req.params.name;
    return this.postService.findAllByCategory(categoryName);
  }
  @HttpCode(HttpStatus.OK)
  @Get('/my-posts/:email')
  findAllPostByUser(@Req() req: Request): Promise<PostEntry[]> {
    const email = req.params.email;
    return this.postService.findAllByUser(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/add')
  createPost(@Body() postData: Partial<PostEntry>): Promise<PostEntry> {
    return this.postService.create(postData);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/update/:id')
  updatePost(
    @Param() id: number,
    @Body() postData: Partial<PostEntry>,
  ): Promise<PostEntry> {
    return this.postService.update(id, postData);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  findAndDelete(@Req() req: Request): Promise<DeleteResult> {
    const id = parseInt(req.params.id);
    return this.postService.delete(id);
  }
}
