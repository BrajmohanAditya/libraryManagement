import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';

import { CreateBookingDto } from './dto/create-booking.dto';

import { UpdateBookingDto } from './dto/update-booking.dto';

import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('create-order')
  createOrder(
    @Body()
    createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.createOrder(createBookingDto);
  }

  @Post('verify-payment')
  verifyPayment(
    @Body()
    verifyPaymentDto: VerifyPaymentDto,
  ) {
    return this.bookingsService.verifyPayment(verifyPaymentDto);
  }

  @Post('manual')
  createManualBooking(
    @Req() req: any,
    @Body()
    createBookingDto: CreateBookingDto,
  ) {
    const adminId = req.admins.id;
    return this.bookingsService.createManualBooking(createBookingDto, adminId);
  }

  @Get()
  findAll(@Req() req: any) {
    const adminId = req.admins.id;
    return this.bookingsService.findAll(adminId);
  }

  @Get('user/:id')
  findUserBookings(
    @Param('id')
    id: string,
  ) {
    return this.bookingsService.findUserById(id);
  }

  @Post('extend/:bookingId/:planId')
  extendBooking(
    @Req() req: any,
    @Param('bookingId')
    bookingId: string,

    @Param('planId')
    planId: string,
  ) {
    const adminId = req.admins.id;
    return this.bookingsService.extendBooking(bookingId, planId, adminId);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id')
    id: string,

    @Body()
    updateBookingDto: UpdateBookingDto,
  ) {
    const adminId = req.admins.id;
    return this.bookingsService.update(id, updateBookingDto, adminId);
  }

  @Delete(':id')
  remove(
    @Req() req: any,
    @Param('id')
    id: string,
  ) {
    const adminId = req.admins.id;
    return this.bookingsService.remove(id, adminId);
  }
}
