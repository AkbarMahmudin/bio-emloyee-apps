import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { JwtGuard } from '@app/common';

@UseGuards(JwtGuard)
@Controller('educations')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(@Body() createEducationDto: CreateEducationDto, @Request() req) {
    return this.educationService.create(req.user.id, createEducationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
    @Request() req,
  ) {
    return this.educationService.update(id, req.user.id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.educationService.remove(id, req.user.id);
  }
}
