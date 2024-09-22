import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';




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
    
    if (createSubscriptionDto.subscriptionInterval === "mensual") {
      let startDate = moment(createSubscriptionDto.subscriptionStartDate);
    
      // Verifica si la fecha de inicio es válida
      if (!startDate.isValid()) {
        throw new BadRequestException('Invalid subscription start date');
      }
    
      const currentYear = moment().year(); // Obtiene el año actual
      const currentMonth = moment().month(); // Obtiene el mes actual (0-11)
    
      // Si el año de la fecha de inicio es anterior al actual, ajustamos al año y mes actuales
      if (startDate.year() < currentYear) {
        startDate = startDate.year(currentYear).month(currentMonth); // Ajusta al mes y año actuales
      }
    
      // Agrega un mes y convierte a string ISO
      createSubscriptionDto.subscriptionEndDate = startDate.add(1, 'month').toDate().toISOString();
    }
    
    
    if (createSubscriptionDto.subscriptionInterval === "anual") {
      let startDate = moment(createSubscriptionDto.subscriptionStartDate);
      
      // Verifica si la fecha de inicio es válida
      if (!startDate.isValid()) {
        throw new BadRequestException('Invalid subscription start date');
      }
    
      const currentYear = moment().year(); // Obtiene el año actual
    
      // Si la fecha de inicio es de años anteriores, ajusta el año al actual
      if (startDate.year() < currentYear) {
        startDate = startDate.year(currentYear);
      }
    
      // Agrega un año y convierte a string ISO
      createSubscriptionDto.subscriptionEndDate = startDate.add(1, 'year').toDate().toISOString();
    }
         
    
    try {
      const subscription = await this.SubscriptionModel.create(createSubscriptionDto);
      return subscription;
    } catch (error) {
      this.handError(error);
    }
  }

  public async findAll() {
    try {
      return await this.SubscriptionModel.find();
    } catch (error) {
      this.handError(error);
    }
  }

  public async findExpiredAndExpiringThisMonth() {
    try {
      const now = moment().tz('America/Mexico_City').startOf('day'); // Fecha de hoy a las 00:00
      const startOfMonth = now.clone().startOf('month').toDate(); // Inicio del mes actual
      const endOfMonth = now.clone().endOf('month').toDate(); // Fin del mes actual
  
      // Busca suscripciones que ya vencieron o que vencerán este mes (sin filtrar por estado)
      const subscriptions = await this.SubscriptionModel.find({
        $or: [
          { subscriptionEndDate: { $lt: now.toDate() } }, // Ya vencidas
          { subscriptionEndDate: { $gte: startOfMonth, $lte: endOfMonth } }, // Vencen este mes
        ]
      }, 'subscriptionId subscriptionName company price subscriptionEndDate'); // Limitar campos
  
      // Si hay suscripciones, las procesamos
      if (subscriptions.length > 0) {
        const expired = subscriptions.filter(sub => moment(sub.subscriptionEndDate).isBefore(now));
        const expiringThisMonth = subscriptions.filter(sub => moment(sub.subscriptionEndDate).isBetween(startOfMonth, endOfMonth, null, '[]'));
  
        return {
          expired: expired.map(sub => ({
            id: sub.subscriptionId,
            name: sub.subscriptionName,
            company: sub.company,
            price: sub.price,
            expiredSince: moment(sub.subscriptionEndDate).fromNow(), // Hace cuánto expiró
          })),
          expiringThisMonth: expiringThisMonth.map(sub => ({
            id: sub.subscriptionId,
            name: sub.subscriptionName,
            company: sub.company,
            price: sub.price,
            expiresIn: moment(sub.subscriptionEndDate).diff(now, 'days') + ' days', // Días hasta que expira
          })),
        };
      } else {
        return { message: 'No expired or expiring subscriptions this month.' };
      }
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




  @Cron('0 8 * * *', {
    timeZone: 'America/Mexico_City',
  })
  async handleCron() {
    const currentTime = moment().tz('America/Mexico_City').format('HH:mm');
    const subscription = await this.findExpiredAndExpiringThisMonth();
    console.log(subscription)
   
    
  }

  

  // Para probar cada minuto
  @Cron('* * * * * *', {
    timeZone: 'America/Mexico_City',
  })
  async testingCron() {
    const currentTime = moment().tz('America/Mexico_City').format('HH:mm');
    console.log(`Prueba de cron cada segundo. Hora actual en Querétaro: ${currentTime}`);
    
  }

}
