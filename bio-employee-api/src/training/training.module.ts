import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { DbService } from '@app/db';
import { BioService } from 'src/bio/bio.service';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService, DbService, BioService],
})
export class TrainingModule {}
