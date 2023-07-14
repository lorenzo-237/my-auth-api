import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TestsService } from './tests.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Public } from '../utils/decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('tests')
@ApiTags('testing')
export class TestsController {
  constructor(private testService: TestsService) {}
  @Public()
  @Get('')
  printHelloWorld() {
    return { message: 'Hello World' };
  }

  @Public()
  @Get('patients')
  getPatients() {
    return [
      { id: 1, name: 'lorenzo' },
      { id: 2, name: 'max' },
    ];
  }

  @Public()
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

  @Post('payments/create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const response = await this.testService.createPayment(createPaymentDto);
    return response;
  }
}
