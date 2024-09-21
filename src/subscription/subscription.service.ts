import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './entities/subscription.entity';
import { Model } from 'mongoose';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectModel(Subscription.name)
    private readonly SubscriptionModel: Model<Subscription>,
  ){}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    // Sanitizar antes de crear
    createSubscriptionDto.company = createSubscriptionDto.company.toLowerCase();
    createSubscriptionDto.subscriptionName = createSubscriptionDto.subscriptionName.toLowerCase();
    
    try {
      const subscription = await this.SubscriptionModel.create(createSubscriptionDto);
      return subscription;
    } catch (error) {
      this.handError(error);
    }
  }

  async findAll() {
    try {
      return await this.SubscriptionModel.find();
    } catch (error) {
      this.handError(error);
    }
  }

  async findOne(id: string) {
    const subscription = await this.SubscriptionModel.findOne({ subscriptionId: id.toLowerCase().trim() });
    
    if (!subscription) {
      throw new NotFoundException(`The subscription with ID ${id} doesn't exist`);
    }

    return subscription;
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    try {
      const subscription = await this.findOne(id);

      // Sanitización de los campos si están presentes
      if (updateSubscriptionDto.subscriptionName) {
        updateSubscriptionDto.subscriptionName = updateSubscriptionDto.subscriptionName.toLowerCase().trim();
      }
      if (updateSubscriptionDto.company) {
        updateSubscriptionDto.company = updateSubscriptionDto.company.toLowerCase().trim();
      }
      if (updateSubscriptionDto.mail) {
        updateSubscriptionDto.mail = updateSubscriptionDto.mail.toLowerCase().trim();
      }
      if (updateSubscriptionDto.paymentMethod) {
        updateSubscriptionDto.paymentMethod = updateSubscriptionDto.paymentMethod.toLowerCase().trim();
      }

      // Actualización del documento
      await subscription.updateOne(updateSubscriptionDto);

      // Retorna el documento actualizado
      return { ...subscription.toJSON(), ...updateSubscriptionDto };
    } catch (error) {
      throw new BadRequestException(` ${JSON.stringify(error.keyValue)}`);
    }
  }

  async remove(id: string) {
    const subscription = await this.findOne(id);
    
    try {
      await subscription.deleteOne();
      return { message: `Subscription with ID ${id} has been removed` };
    } catch (error) {
      this.handError(error);
    }
  }

  private handError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Subscription exists in the database ${JSON.stringify(error.keyValue)}`);
    } else {
      throw new InternalServerErrorException(`Unexpected server error`);
    }
  }
}
