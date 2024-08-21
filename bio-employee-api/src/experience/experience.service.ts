import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { DbService } from '@app/db';
import { BioService } from 'src/bio/bio.service';

@Injectable()
export class ExperienceService {
  private readonly logger = new Logger(ExperienceService.name);

  constructor(
    private readonly db: DbService,
    private readonly bioService: BioService,
  ) {}

  async create(userId: string, createExperienceDto: CreateExperienceDto) {
    try {
      const bio = await this.bioService.findOne(userId);

      const experience = await this.db.experience.create({
        data: {
          ...createExperienceDto,
          bio: { connect: { id: bio.id } },
        },
      });

      return experience;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create experience');
    }
  }

  async update(
    id: string,
    userId: string,
    updateExperienceDto: UpdateExperienceDto,
  ) {
    try {
      const experience = await this.db.experience.findUnique({
        where: {
          id,
          bio: { userId },
        },
      });

      if (!experience) throw new NotFoundException('Experience not found');

      return await this.db.experience.update({
        where: { id, bio: { userId } },
        data: updateExperienceDto,
      });
    } catch (error) {
      this.logger.error(error);
      if (error.status === 500)
        throw new InternalServerErrorException('Failed to update experience');

      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      const experience = await this.db.experience.findUnique({
        where: {
          id,
          bio: { userId },
        },
      });

      if (!experience) throw new NotFoundException('Experience not found');

      return await this.db.experience.delete({
        where: { id, bio: { userId } },
      });
    } catch (error) {
      this.logger.error(error);
      if (error.status === 500)
        throw new InternalServerErrorException('Failed to update experience');

      throw error;
    }
  }
}
