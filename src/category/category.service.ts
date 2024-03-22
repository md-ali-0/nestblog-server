import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }
  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }
  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(category);
  }
  async update(
    id: number,
    updateCategoryDoc: Partial<Category>,
  ): Promise<Category> {
    try {
      const reqCategory = await this.categoryRepository.findOneBy({ id });
      reqCategory.name = updateCategoryDoc.name;
      reqCategory.description = updateCategoryDoc.description;
      reqCategory.keywords = updateCategoryDoc.keywords;

      return await this.categoryRepository.save(reqCategory);
    } catch {
      throw new UnauthorizedException();
    }
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete({ id });
  }
}
