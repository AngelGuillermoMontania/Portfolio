import { Body, Controller, Delete, Get, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageMulter } from 'src/configMulter';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { CreateUpdateResumeDto } from './dto/create-update-resume.dto';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  getResume() {
    return this.resumeService.getResume();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: storageMulter
  }))
  postResumeS3(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.resumeService.createResumeS3(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  DeleteResumeS3(@Query('resume') resume: string) {
    return this.resumeService.destroyResumeS3(resume);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  PutDataResume(@Body() body: CreateUpdateResumeDto) {
    return this.resumeService.updateDataResume(body);
  }

  @Post('dev')
  PostDevResume(@Body() body: CreateUpdateResumeDto) {
    return this.resumeService.createResumeDev(body)

  }
    
}
