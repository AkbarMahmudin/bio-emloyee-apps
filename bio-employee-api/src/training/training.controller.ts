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
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtGuard } from '@app/common';

@UseGuards(JwtGuard)
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  create(@Body() createTrainingDto: CreateTrainingDto, @Request() req) {
    return this.trainingService.create(req.user.id, createTrainingDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainingDto: UpdateTrainingDto,
    @Request() req,
  ) {
    return this.trainingService.update(id, req.user.id, updateTrainingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.trainingService.remove(id, req.user.id);
  }
}
