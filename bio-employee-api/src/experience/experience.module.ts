import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { DbService } from '@app/db';
import { BioService } from 'src/bio/bio.service';

@Module({
  controllers: [ExperienceController],
  providers: [ExperienceService, DbService, BioService],
})
export class ExperienceModule {}
