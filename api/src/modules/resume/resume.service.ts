import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Resume } from 'src/models/resume.entity';
import { Repository } from 'typeorm';
import { CreateUpdateResumeDto } from './dto/create-update-resume.dto';

import { createReadStream } from 'fs';
import { s3Client } from 'src/libs/sampleClient';

import 'dotenv/config';

const bucketName = process.env.AWS_BUCKET_NAME || ""

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private resumeRepository: Repository<Resume>,
  ) { }

  async getResumeSpanish() {
    try {
      const Resume = await this.resumeRepository.find();
      const bucketParams = {
        Key: Resume[0].spanish,
        Bucket: bucketName
      }
      let fileStream = s3Client.getObject(bucketParams).createReadStream();
      return new StreamableFile(fileStream)
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async getResumeEnglish() {
    try {
      const Resume = await this.resumeRepository.find();
      const bucketParams = {
        Key: Resume[0].english,
        Bucket: bucketName
      }
      let fileStream = s3Client.getObject(bucketParams).createReadStream();
      return new StreamableFile(fileStream)
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createResumeS3(file: Express.Multer.File) {
    try {
      try {
        const fileStream = createReadStream(file.path)
        const bucketParams = {
          Bucket: bucketName,
          Body: fileStream,
          Key: file.filename
        }
        await s3Client.upload(bucketParams).promise()
        return {
          name: file.filename,
        };
      } catch (error) {
        return new InternalServerErrorException('Database Error/S3');
      }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async destroyResumeS3(resume: string) {
    try {
      const resumeDB = await this.resumeRepository.find();
      if (resumeDB) {
        resume === 'Spanish' ?
          await s3Client.deleteObject({
            Key: resumeDB[0].spanish,
            Bucket: bucketName
          }).promise()
        : await s3Client.deleteObject({
            Key: resumeDB[0].english,
            Bucket: bucketName
          }).promise()
      }
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
