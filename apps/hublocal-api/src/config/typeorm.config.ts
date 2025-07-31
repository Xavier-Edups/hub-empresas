import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}


  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dburl = this.configService.get<string>('DATABASE_URL')
    console.log('--- CONNECTING WITH DATABASE_URL ---');
    console.log(dburl)
    console.log('------------------------------------');

    return {
      type: 'postgres',
      url: dburl,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false, // NUNCA use true em produção
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
    };
  }
}
