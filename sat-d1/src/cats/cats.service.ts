import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './schema/cats.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    // const createdCat = new this.catModel(createCatDto);
    const createdCat = await this.catModel.create(createCatDto);
    // return createdCat.save();
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    const listado = await this.catModel.find().exec();
    return listado;
  }

  async findOne(id: string): Promise<Cat | null> {
    const catFinded = await this.catModel.findById(id).exec();
    if (!catFinded) {
      throw new NotFoundException('El id no existe');
    }
    return catFinded;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel.findById(id);
    if (!updatedCat) {
      throw new NotFoundException('El id no existe');
    }
    updatedCat.name = updateCatDto.name ? updateCatDto.name : updatedCat.name;
    updatedCat.age = updateCatDto.age ? updateCatDto.age : updatedCat.age;
    updatedCat.breed = updateCatDto.breed
      ? updateCatDto.breed
      : updatedCat.breed;
    await updatedCat.save();

    return updatedCat;
  }

  async fisicRemove(id: string): Promise<void> {
    const deletedCat = await this.catModel.findByIdAndDelete(id);
    if (!deletedCat) {
      throw new NotFoundException('El id no existe');
    }
  }
  async logicRemove(id: string): Promise<Cat> {
    const deletedCat = await this.catModel.findById(id).exec();
    if (!deletedCat) {
      throw new NotFoundException('El id no existe');
    }
    deletedCat.isDeleted = true;
    return deletedCat.save();
  }
}
