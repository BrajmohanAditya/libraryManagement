import {
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBookingDto } from './create-booking.dto';

export class VerifyPaymentDto {
  @IsNotEmpty()
  @IsString()
  razorpay_order_id!: string;

  @IsNotEmpty()
  @IsString()
  razorpay_payment_id!: string;

  @IsNotEmpty()
  @IsString()
  razorpay_signature!: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateBookingDto)
  bookingData!: CreateBookingDto;
}