import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ timestamps: true })
export class Cat {
  @Prop()
  name: string;

  @Prop({ default: 1, required: true, min: 0, max: 1 })
  status: number;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
