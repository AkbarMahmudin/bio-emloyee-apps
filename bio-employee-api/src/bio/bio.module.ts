import { Module } from '@nestjs/common';
import { BioService } from './bio.service';
import { BioController } from './bio.controller';
import { DbService } from '@app/db';

@Module({
  controllers: [BioController],
  providers: [BioService, DbService],
})
export class BioModule {}
