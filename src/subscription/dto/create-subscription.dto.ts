import { IsBoolean, IsDateString, IsEmail, IsInt, IsPositive, IsString, Min } from "class-validator";

export class CreateSubscriptionDto {
    
    @IsString()
    subscriptionId: string;

    @IsString()
    subscriptionName: string;

    @IsString()
    company: string;
    
    @IsInt()
    @IsPositive()
    @Min(1)
    price: number; // Cambiado a number

    @IsBoolean()
    status: boolean;
    
    @IsDateString()
    subscriptionStartDate: string; // Cambiado a string para @IsDateString()

    @IsString()
    subscriptionInterval: string; // Cambiado a string para @IsDateString()

    @IsEmail()
    mail: string;

    @IsString()
    password: string;

    @IsString()
    paymentMethod: string; // Cambiado a string para @IsDateString()

    @IsDateString()
    lastReminderDate: string; // Cambiado a string para @IsDateString()

    @IsString()
    subscriptionEndDate: string; // Cambiado a string para @IsDateString()
}
