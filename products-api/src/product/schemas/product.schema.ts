import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageURL: string;

  @Prop({ default: 1 })
  price: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
