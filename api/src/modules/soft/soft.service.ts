import { Injectable, InternalServerErrorException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { SoftSkill } from 'src/models/softSkill.entity';
import { CreateUpdateSoftDto } from './dto/create-update-soft.dto';

import { createReadStream } from 'fs';
import { s3Client } from 'src/libs/sampleClient';

import 'dotenv/config';

const bucketName = process.env.AWS_BUCKET_NAME || ""

@Injectable()
export class SoftService {
  constructor(
    @InjectRepository(SoftSkill) private softRepository: Repository<SoftSkill>,
  ) {}

  async getAllSoft() {
    try {
      const allSoft = await this.softRepository.find();
      return allSoft;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async getImageSoft(name: string) {
    const bucketParams = {
      Key: name,
      Bucket: bucketName
    }
    let fileStream = s3Client.getObject(bucketParams).createReadStream();
    return new StreamableFile(fileStream)
  }

  async createImageSoft(file: Express.Multer.File) {
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
  }

  async destroyImageSoft(id: string) {
    try {
      const deleteImageSoft = await this.softRepository.findOneBy({ id });
      if (deleteImageSoft) {
        const bucketParams = {
          Key: deleteImageSoft?.image,
          Bucket: bucketName
        }
        await s3Client.deleteObject(bucketParams).promise()
      }
      return "success"
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async createSoft(body: CreateUpdateSoftDto) {
    try {
      const newSoft = this.softRepository.create(body);
      await this.softRepository.save(newSoft);
      return newSoft;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async editSoft(body: CreateUpdateSoftDto, id: string) {
    try {
      await this.softRepository.update(
        {
          id,
        },
        body,
      );
      const newSoft = await this.softRepository.findBy({ id });
      return newSoft;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async destroySoft(id: string) {
    try {
      await this.softRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
