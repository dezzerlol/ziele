import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    /*     ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      models: [],
      autoLoadModels: true,
    }), */
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
