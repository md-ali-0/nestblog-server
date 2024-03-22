import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { Comment } from './comment/comment.entity';
import { CommentModule } from './comment/comment.module';
import configuration from './config/configuration';
import { Post } from './post/post.entity';
import { PostModule } from './post/post.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Category, Comment]),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.161.46.178',
      port: 3306,
      username: 'codexeon_kotha',
      password: 'ADokxv4R98WepzplN6',
      database: 'codexeon_kotha',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    CategoryModule,
    PostModule,
    CommentModule,
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
