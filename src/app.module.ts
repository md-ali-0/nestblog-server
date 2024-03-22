import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('dbConfig.dbHost'),
        port: configService.get<number>('dbConfig.dbPort'),
        username: configService.get<string>('dbConfig.dbUser'),
        password: configService.get<string>('dbConfig.dbPass'),
        database: configService.get<string>('dbConfig.dbName'),
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
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
