import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Library } from 'src/librarys/entities/library.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,

    @InjectRepository(Library)
    private readonly libraryRepo: Repository<Library>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(dto: CreateFeedbackDto) {
    try {

      const library = await this.libraryRepo.findOne({
        where: {
          id: dto.libraryId,
        },
      });

      if (!library) {
        throw new BadRequestException('Library not found');
      }

      const user = await this.userRepo.findOne({
        where: {
          id: dto.userId,
        },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const feedback = this.feedbackRepo.create(dto);

      const data = await this.feedbackRepo.save(feedback);

      return {
        message: 'Feedback added successfully',

        data,
      };

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  async findByLibrary(libraryId: string) {
    const feedbacks = await this.feedbackRepo.find({
      where: { library: { id: libraryId } },

      order: {
        createdAt: 'DESC',
      },
    });

    const totalRatings = feedbacks.reduce((sum, item) => sum + item.rating, 0);

    const averageRating =
      feedbacks.length > 0 ? totalRatings / feedbacks.length : 0;

    return {
      message: 'Library feedback retrieved successfully',

      totalFeedbacks: feedbacks.length,

      averageRating: averageRating.toFixed(1),

      data: feedbacks,
    };
  }

  async remove(id: string) {
    try {
      const isMatch = await this.feedbackRepo.findOne({ where: { id } })

      if (!isMatch) {
        throw new BadRequestException("message not found")
      }

      await this.feedbackRepo.delete(id)

      return {
        message: "message delete sucessfully"
      }

    } catch (error) {

      throw new InternalServerErrorException(error)

    }
  }


}
