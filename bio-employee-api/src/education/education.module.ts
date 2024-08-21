import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { DbService } from '@app/db';
import { BioService } from 'src/bio/bio.service';

@Module({
  controllers: [EducationController],
  providers: [EducationService, DbService, BioService],
})
export class EducationModule {}
