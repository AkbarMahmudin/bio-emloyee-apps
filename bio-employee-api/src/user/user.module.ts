import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbService } from '@app/db';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService],
  exports: [UserService],
})
export class UserModule {}
