import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Post } from './post.entity';

interface QueryParameters {
  page?: string;
  size?: string;
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findAll(query: QueryParameters): Promise<Post[]> {
    const page = parseInt(query.page) || 1;
    const size = parseInt(query.size) || 10;

    const skip = (page - 1) * size;

    return this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC')
      .skip(skip)
      .take(size)
      .getMany();
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOneBy({ id });
  }
  findAllByCategory(categoryName: string): Promise<Post[]> {
    return this.postRepository.find({ where: { category: categoryName } });
  }
  async findAllByUser(email: string): Promise<Post[]> {
    const result = await this.postRepository.find({
      where: { createdBy: email },
    });
    return result;
  }

  async findTotal(): Promise<number> {
    return await this.postRepository.count();
  }

  async create(postData: Partial<Post>): Promise<Post> {
    const category = this.postRepository.create(postData);
    return await this.postRepository.save(category);
  }
  async update(id: number, postData: Partial<Post>): Promise<Post> {
    try {
      const postToUpdate = await this.postRepository.findOneBy({ id });
      postToUpdate.title = postData.title;
      postToUpdate.author = postData.author;
      postToUpdate.authorImage = postData.authorImage;
      postToUpdate.category = postData.category;
      postToUpdate.createdBy = postData.createdBy;
      return this.postRepository.save(postToUpdate);
    } catch {
      throw new InternalServerErrorException();
    }
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.postRepository.delete({ id });
  }
}
