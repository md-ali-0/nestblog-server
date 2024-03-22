import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/details/:id')
  findOneCategory(@Req() req: Request): Promise<Category> {
    const id = parseInt(req.params.id);
    return this.categoryService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/update/:id')
  updateCategory(@Req() req: Request): Promise<Category> {
    const id = parseInt(req.params.id);
    const updateCategoryDoc = req.body;
    return this.categoryService.update(id, updateCategoryDoc);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/add')
  createCategory(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.create(categoryData);
  }
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  deleteCategory(@Req() req: Request): Promise<DeleteResult> {
    const id = parseInt(req.params.id);
    return this.categoryService.delete(id);
  }
}
