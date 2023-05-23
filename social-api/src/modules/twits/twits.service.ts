import { Injectable, NotFoundException } from '@nestjs/common';
import { Twit } from './twit.entity';
import { CreateTwitDto, UpdateTwitDto } from './dto';

@Injectable()
export class TwitsService {
  private twits: Twit[] = [
    {
      id: '1',
      message: 'hola mundo',
    },
  ];

  getTwits(): Twit[] {
    return this.twits;
  }
  getTwit(id: string): Twit {
    const twit = this.twits.find((item) => item.id == id);
    if (!twit) {
      throw new NotFoundException('Resource not found');
    }
    return twit;
  }
  createTwit({ message }: CreateTwitDto): void {
    this.twits.push({
      id: (this.twits.length + 1).toString(),
      message,
    });
  }
  updateTwit(id: string, { message }: UpdateTwitDto) {
    const twit: Twit = this.getTwit(id);
    twit.message = message;
    return twit;
  }
  removeTwit(id: string) {
    const index = this.twits.findIndex((twit) => twit.id == id);
    if (index >= 0) {
      this.twits.splice(index, 1);
    }
  }
}
