import { Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription/subscription.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SubscriptionModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-subscription'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
