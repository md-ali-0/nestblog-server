import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category/category.entity';
import { Comment } from './comment/comment.entity';
import { Post } from './post/post.entity';
import { User } from './users/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  getRunning(): string {
    return 'Server is Running ..';
  }
  async getStatus(): Promise<object> {
    const totalPost = await this.postRepository.count();
    const totalCategory = await this.categoryRepository.count();
    const totalUser = await this.usersRepository.count();
    const totalComment = await this.commentRepository.count();
    return { totalPost, totalCategory, totalUser, totalComment };
  }
}
