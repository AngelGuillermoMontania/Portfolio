import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { storageResumeMulterFile } from 'src/configMulter';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { CreateUpdateResumeDto } from './dto/create-update-resume.dto';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get('view/spanish')
  @Header('Content-Type', 'application/pdf')
  @Header(
    'Content-Disposition',
    'inline',
  )
  viewSpanish(): Promise<StreamableFile | InternalServerErrorException> {
    return this.resumeService.getResumeSpanish();
  }

  @Get('view/english')
  @Header('Content-Type', 'application/pdf')
  @Header(
    'Content-Disposition',
    'inline',
  )
  viewEnglish(): Promise<StreamableFile | InternalServerErrorException> {
    return this.resumeService.getResumeEnglish();
  }

  @Get('download/spanish')
  @Header('Content-Type', 'application/pdf')
  @Header(
    'Content-Disposition',
    'attachment',
  )
  downloadSpanish(): Promise<StreamableFile | InternalServerErrorException> {
    return this.resumeService.getResumeSpanish();
  }

  @Get('download/english')
  @Header('Content-Type', 'application/pdf')
  @Header(
    'Content-Disposition',
    'attachment',
  )
  downloadEnglish(): Promise<StreamableFile | InternalServerErrorException> {
    return this.resumeService.getResumeEnglish();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageResumeMulterFile,
    }),
  )
  postResumeS3(@UploadedFile() file: Express.Multer.File) {
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
    return this.resumeService.createResumeDev(body);
  }
}
