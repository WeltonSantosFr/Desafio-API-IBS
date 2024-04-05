import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AuthMiddleware } from './admin/auth.middleware';
dotenv.config()

@Module({
  imports: [UsersModule, AddressModule, AdminModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [join(__dirname, '**', "*.entity{.ts,.js}")],
    migrations: [join(__dirname, '**', "migrations/*{.ts,.js}")],
    synchronize: false,
    autoLoadEntities: true
  })],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'admin/login', method: RequestMethod.POST })
      .exclude({ path: 'admin/new', method: RequestMethod.POST })
      .forRoutes({ path: 'user*', method: RequestMethod.ALL }, { path: 'address*', method: RequestMethod.ALL }, { path: 'admin', method: RequestMethod.ALL })

  }
  constructor(private dataSource: DataSource) { }
}
