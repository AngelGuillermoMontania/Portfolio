import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateUpdateResumeDto } from './dto/create-update-resume.dto';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  getResume() {
    return this.resumeService.getResumes();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  postResume(
    @Body() body: CreateUpdateResumeDto,
    files: Array<Express.Multer.File>,
  ) {
    return this.resumeService.createResumes(body, files);
  }

  /* @Put(body file)
        delete select and update/create new
     */
}
