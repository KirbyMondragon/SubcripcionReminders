import { Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription/subscription.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SubscriptionModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-subscription')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
