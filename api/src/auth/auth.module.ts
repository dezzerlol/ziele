import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || '',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
