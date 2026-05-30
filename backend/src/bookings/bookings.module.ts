import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { LibraryPrice } from 'src/library_price/entities/library_price.entity';
import { Sheet } from 'src/sheets/entities/sheet.entity';
import { Library } from 'src/librarys/entities/library.entity';
import { User } from 'src/users/entities/user.entity';
import { LibraryFeature } from 'src/library-feature/entities/library-feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking , LibraryPrice , Sheet , Library , User , LibraryFeature])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
