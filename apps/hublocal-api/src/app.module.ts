import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { LocationsModule } from './modules/locations/locations.module';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. Módulo de configuração, geralmente global
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Módulo de banco de dados (TypeORM) com configuração assíncrona
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    // 3. Módulo de logging
    LoggerModule.forRoot(),

    // 4. Seus módulos de funcionalidade (feature modules)
    UsersModule,
    AuthModule,
    CompaniesModule,
    LocationsModule,
  ],
  controllers: [
    // Controladores que pertencem diretamente a este módulo
    AppController, // Ex: para uma rota de health check "/"
  ],
  providers: [
    // Serviços que pertencem diretamente a este módulo
    AppService, // Lógica do AppController
    TypeOrmConfigService, // Necessário para o TypeOrmModule.forRootAsync acima
  ],
})
export class AppModule {}
