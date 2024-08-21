import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BioService } from './bio.service';
import { JwtGuard } from '@app/common';
import { CreateBioDto } from './dto/create-bio.dto';
import { UpdateBioDto } from './dto/update-bio.dto';

@UseGuards(JwtGuard)
@Controller('bio')
export class BioController {
  constructor(private readonly bioService: BioService) {}

  @Post()
  async create(@Body() createBioDto: CreateBioDto, @Request() req) {
    return this.bioService.create(req.user.id, createBioDto);
  }

  @Patch()
  async update(@Body() updateBioDto: UpdateBioDto, @Request() req) {
    return this.bioService.update(req.user.id, updateBioDto);
  }

  @Get()
  async findOne(@Request() req) {
    return this.bioService.findOne(req.user.id);
  }
}
