import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Reference } from 'src/models/reference.entity';
import { Repository } from 'typeorm';
import { CreateUpdateReferenceDto } from './dto/create-update-reference.dto';

import { S3Client, CreateBucketCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import fs, { createReadStream } from 'fs';
import 'dotenv/config';

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCES_KEY || '',
    secretAccessKey: process.env.AWS_PRIVATE_KEY || '',
  },
});

@Injectable()
export class ReferenceService {
  constructor(
    @InjectRepository(Reference)
    private referenceRepository: Repository<Reference>,
  ) {}

  async getAllReferences() {
    try {
      const allReferences = await this.referenceRepository.find();
      return allReferences;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createImageReference(
    file: Express.Multer.File,
  ) {
    const fileStream = createReadStream(file.path)
    try {   
      let listImage = [];
      const bucketParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename,
      };
      listImage.push(await client.send(new PutObjectCommand(bucketParams)));
      return {
        name: file.filename
      }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3')
    }
  }

  async destroyImageReference(id: string) {
    try {
      const deleteImageReference = await this.referenceRepository.findOneBy({id})
      let listImage = [];
        const bucketParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: deleteImageReference?.image,
        };
        listImage.push(await client.send(new DeleteObjectCommand(bucketParams)));
        return {
          name: deleteImageReference?.image
        }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3')
    }
  }

  async createDataReference(body: CreateUpdateReferenceDto) {
    try {
      const newReference = this.referenceRepository.create(body)
      await this.referenceRepository.save(body)
      return newReference
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
    
  }

  async editReference(
    body: CreateUpdateReferenceDto,
    id: string,
  ) {
    try {
      const newReferenceEdit = await this.referenceRepository.update({
        id
      }, body)
      const referenceEdit = await this.referenceRepository.findOne({where: {
        id
      }})
      return referenceEdit
    } catch (error) {
      return new InternalServerErrorException("Database Error")
    }
    
  }


  async destroyReference(id: string) {
    try {
      await this.referenceRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
