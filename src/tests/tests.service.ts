import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class TestsService {
  private users = [
    {
      email: 'lorenzo@gmail.com',
    },
    {
      email: 'paolo@gmail.com',
    },
    {
      email: 'fabrizio@gmail.com',
    },
  ];

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      throw new BadRequestException();
    }

    return {
      status: 'success',
    };
  }
}
