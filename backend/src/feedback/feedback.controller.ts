import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';


@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get('library/:libraryId')
  findByLibrary(
    @Param('libraryId')
    libraryId: string,
  ) {

    return this.feedbackService.findByLibrary(
      libraryId,
    );
  }
  

  @Delete('id')
  remove(@Param('id') id: string) {

    return this.feedbackService.remove(id)

  }
}
