import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExtService } from './ext.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { ApiTags } from '@nestjs/swagger';

@Controller('ext')
@ApiTags('JWT Access')
@UseGuards(JwtAuthGuard)
export class ExtController {
  constructor(private extService: ExtService) {}

  @Get('users')
  findAllUsers() {
    return this.extService.findAllUsers();
  }
}
