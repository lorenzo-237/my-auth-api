import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/utils/decorators';

@Controller('tests')
export class TestsController {
  @Public()
  @Get('')
  printHelloWorld() {
    return { message: 'Hello World' };
  }
}
