import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all/:email')
  findAllPosts(@Req() req: Request): Promise<Wishlist[]> {
    const email = req.params.email;
    return this.wishlistService.findAll(email);
  }
  @HttpCode(HttpStatus.OK)
  @Post('/add')
  createPost(@Body() postData: Partial<Wishlist>): Promise<Wishlist> {
    return this.wishlistService.create(postData);
  }
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  findAndDelete(@Req() req: Request): Promise<DeleteResult> {
    const id = parseInt(req.params.id);
    return this.wishlistService.delete(id);
  }
}
