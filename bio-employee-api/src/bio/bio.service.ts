import { DbService } from '@app/db';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBioDto } from './dto/create-bio.dto';
import { UpdateBioDto } from './dto/update-bio.dto';

@Injectable()
export class BioService {
  private readonly logger = new Logger(BioService.name);

  constructor(private readonly db: DbService) {}

  async create(userId: string, createBioDto: CreateBioDto) {
    try {
      const newBio = await this.db.bio.create({
        data: {
          ...createBioDto,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return newBio;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating bio');
    }
  }

  async update(userId: string, udpateBioDto: UpdateBioDto) {
    try {
      const updatedBio = await this.db.bio.update({
        where: {
          userId,
        },
        data: udpateBioDto,
      });

      return updatedBio;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating bio');
    }
  }

  async findOne(userId: string) {
    try {
      const bio = await this.db.bio.findUnique({
        where: {
          userId,
        },
      });

      if (!bio) {
        throw new NotFoundException('Bio not found');
      }

      return bio;
    } catch (error) {
      this.logger.error(error);
      if (error.status === 500)
        throw new InternalServerErrorException('Error fetching bio');

      throw error;
    }
  }
}
