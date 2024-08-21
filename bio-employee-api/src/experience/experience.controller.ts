import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { JwtGuard } from '@app/common';

@UseGuards(JwtGuard)
@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto, @Request() req) {
    return this.experienceService.create(req.user.id, createExperienceDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
    @Request() req,
  ) {
    return this.experienceService.update(id, req.user.id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.experienceService.remove(id, req.user.id);
  }
}
