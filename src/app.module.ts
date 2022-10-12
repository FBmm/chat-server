import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:wu19931018%40!*@1.14.73.77:27017/app_test?authSource=admin'), UserModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}