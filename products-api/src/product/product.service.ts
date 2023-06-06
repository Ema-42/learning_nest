import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.dto';
import { ProductInterfaces } from './interfaces/product.interfaces';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createProduct = await this.productModel.create(createProductDto);
    return createProduct;
  }
  async findAll(): Promise<Product[]> {
    const listado = await this.productModel.find().exec();
    return listado;
  }

  async findOne(id: string): Promise<Product> {
    const productBuscar = await this.productModel.findById(id).exec();
    if (!productBuscar) {
      throw new NotFoundException('El id no existe');
    }
    return productBuscar;
  }
}
