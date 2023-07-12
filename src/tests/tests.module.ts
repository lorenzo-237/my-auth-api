import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';

@Module({
  providers: [],
  controllers: [TestsController],
})
export class TestsModule {}
