import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './entities/subscription.entity';
import { Model } from 'mongoose';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectModel(Subscription.name)
    private readonly SubscriptionModel:Model <Subscription>,
  ){}
  
  
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    createSubscriptionDto.company = createSubscriptionDto.company.toLowerCase()
    createSubscriptionDto.subscriptionName = createSubscriptionDto.subscriptionName.toLowerCase()
    try {
      const subscription = await this.SubscriptionModel.create(createSubscriptionDto);
      return subscription; 
    } catch (error) {
      throw new BadRequestException(`Subscripcion exists in the database ${ JSON.stringify(error.keyValue)}`)
    }
    
  }

  async findAll() {
    try {
      const subscription = await this.SubscriptionModel.find()
      return subscription;
    } catch (error) {
      throw new BadRequestException();
    }
    
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
