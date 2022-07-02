import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Resume } from 'src/models/resume.entity';
import { Repository } from 'typeorm';

import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';
import { CreateUpdateResumeDto } from './dto/create-update-resume.dto';
import fs from 'fs';
import 'dotenv/config';

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

  async getResumes() {
    try {
      const allResumes = await this.resumeRepository.find();
      return allResumes;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createResumes(
    body: CreateUpdateResumeDto,
    files: Array<Express.Multer.File>,
  ) {
    try {
      /* Logic S3 */
      let listResponse = [];
      files.forEach(async (element) => {
        const fileStream = fs.createReadStream(element.path);
        const bucketParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: fileStream,
          Key: element.filename,
        };

        listResponse.push(
          await client.send(new CreateBucketCommand(bucketParams)),
        );
      });
      /* const createResumes = this.resumeRepository.create({
                spanish: listResponse[0]."algo"
                english: listResponse[1]."algo"
            })
            return createResumes */
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
