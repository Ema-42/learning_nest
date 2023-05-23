import { IsString } from 'class-validator';

export class CreateTwitDto {
  @IsString()
  readonly message: string;
}
