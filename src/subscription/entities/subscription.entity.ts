import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema() // Añade createdAt y updatedAt automáticamente
export class Subscription extends Document {
    @Prop({
      unique: true,
      required: true,
      index: true,
    })
    subscriptionId: string;
  
    @Prop({
      required: true,
      index: true,
    })
    subscriptionName: string;
  
    @Prop({
      required: true,
      index: true,
    })
    company: string;
  
    @Prop({
      required: true,
      min: 1,
    })
    price: number;
  
    @Prop({
      required: true,
      default: true,
    })
    status: boolean;
  
    @Prop({
      required: true,
    })
    subscriptionStartDate: Date;
  
    @Prop({
      required: true,
      enum: ['mensual', 'anual'],
    })
    subscriptionInterval: string;
  
    @Prop({
      required: true,
      match: /^\S+@\S+\.\S+$/,
    })
    mail: string;
  
    @Prop({
      required: true,
    })
    password: string;
  
    @Prop({
      required: true,
    })
    paymentMethod: string;
  
    @Prop({
      required: true,
    })
    lastReminderDate: Date;
  
    @Prop({
      required: true,
    })
    subscriptionEndDate: Date;
  }







export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);




