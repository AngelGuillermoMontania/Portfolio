import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Resume } from 'src/models/resume.entity';
import { Repository } from 'typeorm';

import { S3Client, CreateBucketCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { CreateUpdateResumeDto } from './dto/create-update-resume.dto';
import fs, { createReadStream, existsSync, unlinkSync } from 'fs';
import 'dotenv/config';
import { join } from 'path';

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCES_KEY || '',
    secretAccessKey: process.env.AWS_PRIVATE_KEY || '',
  },
});

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private resumeRepository: Repository<Resume>,
  ) {}

  async getResume() {
    try {
      const Resume = await this.resumeRepository.find();
      return Resume;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createResumeS3(
    file: Express.Multer.File,
  ) {
    const fileStream = createReadStream(file.path)
    try {   
      return {
        name: file.filename
      }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3')
    }
  }

  async destroyResumeS3(resume: string) {
    try {
      const resumeDB = await this.resumeRepository.find();
      resume === "Spanish" ?
          unlinkSync(join(process.cwd(), '/assets/', resumeDB[0]?.spanish))
      : unlinkSync(join(process.cwd(), '/assets/', resumeDB[0]?.english))  
        return {
          name: resume === "Spanish" ? resumeDB[0].spanish : resumeDB[0].english,
        }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3')
    }
  }

  async updateDataResume(body: CreateUpdateResumeDto) {
    try {
      const resumeDB = await this.resumeRepository.find();
      if(body.spanish === "") {
        const newResumeEdit = await this.resumeRepository.update({
          id: resumeDB[0].id
        }, {
          spanish: resumeDB[0].spanish,
          english: body.english
        })
      } else {
        const newResumeEdit = await this.resumeRepository.update({
          id: resumeDB[0].id
        }, {
          english: resumeDB[0].english,
          spanish: body.spanish
        })
      }
      const resumeEdit = await this.resumeRepository.findOne({where: {
        id: resumeDB[0].id
      }})
      return resumeEdit
    } catch (error) {
      return new InternalServerErrorException('Database Error')
    }
  }

  async createResumeDev(body: CreateUpdateResumeDto) {
    try {
      const newResumeDev = await this.resumeRepository.create(body)
      await this.resumeRepository.save(newResumeDev)
    } catch (error) {
      return new InternalServerErrorException('Database Error')
    }
  }
}
