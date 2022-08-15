import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Resume } from 'src/models/resume.entity';
import { Repository } from 'typeorm';

import { CreateUpdateResumeDto } from './dto/create-update-resume.dto';
import { createReadStream, unlinkSync } from 'fs';

import { join } from 'path';
import 'dotenv/config';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private resumeRepository: Repository<Resume>,
  ) {}

  async viewResumeSpanish() {
    try {
      const Resume = await this.resumeRepository.find();
      const file = createReadStream(
        join(process.cwd(), `/assets/${Resume[0].spanish}`),
      );
      return new StreamableFile(file);
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async viewResumeEnglish() {
    try {
      const Resume = await this.resumeRepository.find();
      const file = createReadStream(
        join(process.cwd(), `/assets/${Resume[0].english}`),
      );
      return new StreamableFile(file);
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async downloadResumeSpanish() {
    try {
      const Resume = await this.resumeRepository.find();
      const file = createReadStream(
        join(process.cwd(), `/assets/${Resume[0].spanish}`),
      );
      return new StreamableFile(file);
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async downloadResumeEnglish() {
    try {
      const Resume = await this.resumeRepository.find();
      const file = createReadStream(
        join(process.cwd(), `/assets/${Resume[0].english}`),
      );
      return new StreamableFile(file);
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createResumeS3(file: Express.Multer.File) {
    const fileStream = createReadStream(file.path);
    try {
      return {
        name: file.filename,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async destroyResumeS3(resume: string) {
    try {
      const resumeDB = await this.resumeRepository.find();
      resume === 'Spanish'
        ? unlinkSync(join(process.cwd(), '/assets/', resumeDB[0]?.spanish))
        : unlinkSync(join(process.cwd(), '/assets/', resumeDB[0]?.english));
      return {
        name: resume === 'Spanish' ? resumeDB[0].spanish : resumeDB[0].english,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async updateDataResume(body: CreateUpdateResumeDto) {
    try {
      const resumeDB = await this.resumeRepository.find();
      if (body.spanish === '') {
        const newResumeEdit = await this.resumeRepository.update(
          {
            id: resumeDB[0].id,
          },
          {
            spanish: resumeDB[0].spanish,
            english: body.english,
          },
        );
      } else {
        const newResumeEdit = await this.resumeRepository.update(
          {
            id: resumeDB[0].id,
          },
          {
            english: resumeDB[0].english,
            spanish: body.spanish,
          },
        );
      }
      const resumeEdit = await this.resumeRepository.findOne({
        where: {
          id: resumeDB[0].id,
        },
      });
      return resumeEdit;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createResumeDev(body: CreateUpdateResumeDto) {
    try {
      const newResumeDev = await this.resumeRepository.create(body);
      await this.resumeRepository.save(newResumeDev);
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
