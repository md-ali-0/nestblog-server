import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async userCreate(
    username: string,
    name: string,
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const newUser = this.usersRepository.create({
      username,
      name,
      email,
      password,
    });
    return this.usersRepository.save(newUser);
  }
}
