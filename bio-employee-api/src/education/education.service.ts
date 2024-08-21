import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { DbService } from '@app/db';
import { BioService } from 'src/bio/bio.service';

@Injectable()
export class EducationService {
  private readonly logger = new Logger(EducationService.name);

  constructor(
    private readonly db: DbService,
    private readonly bioService: BioService,
  ) {}

  async create(userId: string, createEducationDto: CreateEducationDto) {
    try {
      const bio = await this.bioService.findOne(userId);
      const newEducation = await this.db.education.create({
        data: {
          ...createEducationDto,
          bio: {
            connect: {
              id: bio.id,
            },
          },
        },
      });

      return newEducation;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Can't create education");
    }
  }

  async update(
    id: string,
    userId: string,
    updateEducationDto: UpdateEducationDto,
  ) {
    try {
      const education = await this.db.education.findUnique({
        where: {
          id,
          bio: {
            userId,
          },
        },
      });

      if (!education) {
        throw new NotFoundException('Education not found');
      }

      const updatedEducation = await this.db.education.update({
        where: {
          id,
          bio: {
            userId,
          },
        },
        data: updateEducationDto,
      });

      return updatedEducation;
    } catch (error) {
      this.logger.error(error);
      if (error.status === 500)
        throw new InternalServerErrorException("Can't update education");

      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      const education = await this.db.education.findUnique({
        where: {
          id,
          bio: {
            userId,
          },
        },
      });

      if (!education) {
        throw new NotFoundException('Education not found');
      }

      await this.db.education.delete({
        where: {
          id,
          bio: {
            userId,
          },
        },
      });

      return education;
    } catch (error) {
      this.logger.error(error);
      if (error.status === 500)
        throw new InternalServerErrorException("Can't delete education");

      throw error;
    }
  }
}
