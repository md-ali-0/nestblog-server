import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}
  async findAll(email: string): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({ where: { wishlistBy: email } });
  }
  async create(wishlistData: Partial<Wishlist>): Promise<Wishlist> {
    const category = this.wishlistRepository.create(wishlistData);
    return await this.wishlistRepository.save(category);
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.wishlistRepository.delete({ id });
  }
}
