import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
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
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
