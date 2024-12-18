import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule'ü tüm proje için global yapar
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
