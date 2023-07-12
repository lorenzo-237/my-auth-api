import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/utils/decorators';

@Controller('tests')
export class TestsController {
  @Public()
  @Get('')
  printHelloWorld() {
    return { message: 'Hello World' };
  }

  @Public()
  @Get('patients')
  getPatients() {
    return [{ id: 1 }, { id: 2 }];
  }
}
