import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

interface commentData {
  comment: string;
  name: string;
  authorImage: string;
  postId: number;
  email: string;
}

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }
  async findOne(id: number): Promise<Comment> {
    return await this.commentRepository.findOneBy({ id });
  }
  async findAllByPostID(id: number): Promise<Comment[]> {
    return await this.commentRepository.find({ where: { postId: id } });
  }
  async create(commentData: commentData): Promise<Comment> {
    const comment = this.commentRepository.create(commentData);
    return await this.commentRepository.save(comment);
  }
  async update(id: number, commentData: Partial<Comment>): Promise<Comment> {
    try {
      const commentToUpdate = await this.commentRepository.findOneBy({ id });
      console.log(commentToUpdate);

      commentToUpdate.comment = commentData.comment;
      return this.commentRepository.save(commentToUpdate);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
