import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
// import { Public } from 'src/utils/decorators';

@Controller('tests')
export class TestsController {
  //   @Public()
  @Get('')
  printHelloWorld() {
    return { message: 'Hello World' };
  }

  //   @Public()
  @Get('patients')
  getPatients() {
    return [
      { id: 1, name: 'lorenzo' },
      { id: 2, name: 'max' },
    ];
  }

  //   @Public()
  @Get('payments')
  getPayments(@Req() request: Request, @Res() response: Response) {
    const { count, page } = request.query;
    if (!count || !page) {
      response
        .status(400)
        .send({ msg: 'Missing count or page query parameter' });
    } else {
      response.send(200);
    }
  }
}
