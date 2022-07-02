import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Reference } from 'src/models/reference.entity';
import { Repository } from 'typeorm';
import { CreateUpdateReferenceDto } from './dto/create-update-reference.dto';

import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';
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

  async createReference(
    body: CreateUpdateReferenceDto,
    file: Express.Multer.File,
  ) {
    try {
      console.log(file.path);
      const newReference = this.referenceRepository.create(body); //Create the project
      /* Init load images S3 */
      let listImage = [];
      let fileStream = fs.createReadStream(file.path);
      const bucketParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: file.stream,
        Key: file.filename,
      };
      listImage.push(await client.send(new CreateBucketCommand(bucketParams)));

      /* console.log(listImage) */

      /* Finish load images S3 */

      /**
       * Agregar Skills
       * Agregar Tools
       */
      await this.referenceRepository.save(newReference); //Save the project
      return newReference;
    } catch (error) {
      return error.message;
    }
  }

  async editReference(
    body: CreateUpdateReferenceDto,
    file: Express.Multer.File,
    id: string,
  ) {
    try {
      if (file) {
        /* Logic S3 */
      }
      const editReference = await this.referenceRepository.update(
        {
          id,
        },
        body,
      );
      const newReference = await this.referenceRepository.findBy({ id });
      return newReference;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async destroyReference(id: string) {
    try {
      const destroyReference = await this.referenceRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
