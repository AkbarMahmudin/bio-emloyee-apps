import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { DbService } from '@app/db';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly db: DbService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.db.user.create({
        data: {
          email: createUserDto.email,
          password: bcrypt.hashSync(createUserDto.password, 10),
        },
        select: {
          id: true,
          email: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(query?: {
    name?: string;
    position?: string;
    education?: string;
  }) {
    try {
      return await this.db.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          bio: {
            select: {
              jobApplied: true,
              placeDateBirth: true,
            },
          },
        },
        where: {
          name: {
            contains: query?.name,
          },
          bio: {
            jobApplied: {
              contains: query?.position,
            },
            educations: {
              some: {
                level: {
                  contains: query?.education,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(error);

      if (error.status === 500) {
        throw new InternalServerErrorException('Error fetching users');
      }

      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          bio: {
            include: {
              educations: true,
              trainings: true,
              experiences: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error(error);

      if (error.status === 500) {
        throw new InternalServerErrorException('Error fetching user');
      }

      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(id);

      let fieldsToUpdate = {};

      for (const key in updateUserDto) {
        if (updateUserDto[key]) {
          if (key === 'password') {
            updateUserDto[key] = bcrypt.hashSync(updateUserDto[key], 10);
          }

          fieldsToUpdate = {
            ...fieldsToUpdate,
            [key]: updateUserDto[key],
          };
        }
      }

      return await this.db.user.update({
        where: {
          id,
        },
        data: fieldsToUpdate,
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      if (error.status === 500) {
        throw new InternalServerErrorException('Error updating user');
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      return await this.db.user.delete({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      if (error.status === 500) {
        throw new InternalServerErrorException('Error deleting user');
      }

      throw error;
    }
  }

  async findByEmail(email: string) {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
