import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
import { join } from 'path';
dotenv.config()

@Module({
  imports: [UsersModule, AddressModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [join(__dirname, '**', "*.entity{.ts,.js}")],
    migrations: [join(__dirname, '**', "migrations/*{.ts,.js}")],
    synchronize: false,
    autoLoadEntities:true
  })],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {
  constructor (private dataSource: DataSource) {}
}
