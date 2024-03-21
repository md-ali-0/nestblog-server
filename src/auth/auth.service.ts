import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  signIn = async (email: string, pass: string): Promise<User | any> => {
    const user = await this.userService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { user, token };
  };

  signUP = async (signUpUser: Record<string, any>): Promise<User | any> => {
    const user = await this.userService.userCreate(
      signUpUser.username,
      signUpUser.name,
      signUpUser.email,
      signUpUser.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { user, token };
  };

  tokenVerify = async (reqUser: any): Promise<User | any> => {
    try {
      const user = await this.userService.findOne(reqUser.email);
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  };
}
