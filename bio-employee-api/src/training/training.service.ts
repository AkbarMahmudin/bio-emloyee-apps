import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { DbService } from '@app/db';
import { BioService } from 'src/bio/bio.service';

@Injectable()
export class TrainingService {
  private readonly logger = new Logger(TrainingService.name);

  constructor(
    private readonly db: DbService,
    private readonly bioService: BioService,
  ) {}

  async create(userId: string, createTrainingDto: CreateTrainingDto) {
    try {
      const bio = await this.bioService.findOne(userId);

      const training = await this.db.training.create({
        data: {
          ...createTrainingDto,
          bio: {
            connect: {
              id: bio.id,
            },
          },
        },
      });

      return training;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('Failed to create training');
    }
  }

  async update(
    id: string,
    userId: string,
    updateTrainingDto: UpdateTrainingDto,
  ) {
    try {
      const training = await this.db.training.findUnique({
        where: {
          id,
          bio: {
            userId,
          },
        },
      });

      if (!training) {
        throw new NotFoundException('Training not found');
      }

      return await this.db.training.update({
        where: {
          id,
          bio: {
            userId,
          },
        },
        data: updateTrainingDto,
      });
    } catch (error) {
      this.logger.error(error.message);
      if (error.status === 500)
        throw new InternalServerErrorException('Failed to update training');

      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      const training = await this.db.training.findUnique({
        where: {
          id,
          bio: {
            userId,
          },
        },
      });

      if (!training) {
        throw new NotFoundException('Training not found');
      }

      return await this.db.training.delete({
        where: {
          id,
          bio: {
            userId,
          },
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      if (error.status === 500)
        throw new InternalServerErrorException('Failed to delete training');

      throw error;
    }
  }
}
