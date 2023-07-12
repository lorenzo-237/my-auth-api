import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';

@Module({
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule {}
