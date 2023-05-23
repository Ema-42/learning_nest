import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TwitsService } from './twits.service';
import { Twit } from './twit.entity';
import { CreateTwitDto, UpdateTwitDto } from './dto';

@Controller('twits')
export class TwitsController {
  constructor(private readonly twitService: TwitsService) {}
  @Get()
  getTwits(@Query() filterQuery): Twit[] {
    // const { searchTerm, orderBy } = filterQuery;
    return this.twitService.getTwits();
  }
  @Get(':id')
  getTwit(@Param('id') id): Twit {
    return this.twitService.getTwit(id);
  }
  @Post()
  //   @HttpCode(HttpStatus.NO_CONTENT)
  createTwit(@Body() message: CreateTwitDto) {
    // console.log(message instanceof CreateTwitDto);
    return this.twitService.createTwit(message);
  }
  @Patch(':id')
  updateTwit(@Param('id') id: string, @Body() message: UpdateTwitDto): Twit {
    return this.twitService.updateTwit(id, message);
  }
  @Delete(':id')
  deleteTwit(@Param('id') id: string): void {
    return this.twitService.removeTwit(id);
  }
}
