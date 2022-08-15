import { Body, Controller, Delete, Get, Header, InternalServerErrorException, Post, Put, Query, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { storageMulterFile } from 'src/configMulter';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { CreateUpdateResumeDto } from './dto/create-update-resume.dto';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get('view/spanish')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename="AngelMontaña_SpanishCV.pdf"')
  viewSpanish(): Promise<StreamableFile | InternalServerErrorException> {
    return this.resumeService.viewResumeSpanish()
  }
  @Get('view/english')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename="AngelMontaña_EnglishCV.pdf"')
  viewEnglish(): Promise<StreamableFile | InternalServerErrorException> {
    return this.resumeService.viewResumeEnglish()
  }
  @Get('download/spanish')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="AngelMontaña_SpanishCV.pdf"')
  downloadSpanish(): Promise<StreamableFile | InternalServerErrorException> {
    return this.resumeService.downloadResumeSpanish()
  }
  @Get('download/english')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="AngelMontaña_EnglishCV.pdf"')
  downloadEnglish(): Promise<StreamableFile | InternalServerErrorException> {
    return this.resumeService.downloadResumeEnglish()
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: storageMulterFile
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
