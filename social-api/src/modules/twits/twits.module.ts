import { Module } from '@nestjs/common';
import { TwitsController } from './twits.controller';
import { TwitsService } from './twits.service';

@Module({
  controllers: [TwitsController],
  providers: [TwitsService],
})
export class TwitsModule {}
