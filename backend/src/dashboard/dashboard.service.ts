import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Admin } from 'src/admins/entities/admin.entity';
import { User } from 'src/users/entities/user.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Library } from 'src/librarys/entities/library.entity';
import { LibraryPrice } from 'src/library_price/entities/library_price.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,

    @InjectRepository(Feedback)
    private feedbackRepo: Repository<Feedback>,

    @InjectRepository(Library)
    private libraryRepo: Repository<Library>,

    @InjectRepository(LibraryPrice)
    private priceRepo: Repository<LibraryPrice>,
  ) {}

  async getDashboardData(adminId: string) {
    // ======================
    // CHECK ADMIN
    // ======================
    const admin = await this.adminRepo.findOne({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    // ======================
    // OVERVIEW STATS
    // ======================

    const totalUsers = await this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.library', 'library')
      .where('library.adminId = :adminId', { adminId })
      .getCount();

    const totalLibraries = await this.libraryRepo.count({
      where: { admin: { id: adminId } },
    });

    const totalBookings = await this.bookingRepo
      .createQueryBuilder('booking')
      .innerJoin('booking.library', 'library')
      .where('library.adminId = :adminId', { adminId })
      .getCount();

    const activeBookings = await this.bookingRepo
      .createQueryBuilder('booking')
      .innerJoin('booking.library', 'library')
      .where('library.adminId = :adminId', { adminId })
      .andWhere('booking.status = :status', { status: 'ACTIVE' })
      .getCount();

    // ======================
    // REVENUE
    // ======================

    const revenueResult = await this.bookingRepo
      .createQueryBuilder('booking')
      .innerJoin('booking.library', 'library')
      .innerJoin(LibraryPrice, 'plan', 'plan.id::text = booking.planId')
      .where('library.adminId = :adminId', { adminId })
      .select('SUM(plan.price)', 'totalRevenue')
      .getRawOne();

    const totalRevenue = Number(revenueResult?.totalRevenue) || 0;

    // ======================
    // RECENT BOOKINGS
    // ======================

    const recentBookings = await this.bookingRepo
      .createQueryBuilder('booking')
      .innerJoin('booking.library', 'library')
      .where('library.adminId = :adminId', { adminId })
      .orderBy('booking.createdAt', 'DESC')
      .take(5)
      .getMany();

    // ======================
    // RECENT FEEDBACKS
    // ======================

    const recentFeedbacks = await this.feedbackRepo
      .createQueryBuilder('feedback')
      .innerJoin('feedback.library', 'library')
      .innerJoin('feedback.user', 'user')
      .where('library.adminId = :adminId', { adminId })
      .orderBy('feedback.createdAt', 'DESC')
      .take(5)
      .getMany();

    // ======================
    // FINAL RESPONSE
    // ======================

    return {
      overview: {
        totalUsers,
        totalLibraries,
        totalBookings,
        activeBookings,
        totalRevenue,
      },

      recentBookings,
      recentFeedbacks,
    };
  }
}