import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Skill } from 'src/models/skill.entity';
import { CreateUpdateSkillDto } from './dto/create-update-skill.dto';

import fs from 'fs';
import 'dotenv/config';
import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCES_KEY || '',
    secretAccessKey: process.env.AWS_PRIVATE_KEY || '',
  },
});

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async getAllSkill() {
    try {
      const allSkills = await this.skillRepository.find();
      return allSkills;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createSkill(body: CreateUpdateSkillDto, file: Express.Multer.File) {
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
    /* const newSkill = this.skillRepository.create({
            ...body,
            image: listImage[0]
        }) 
        this.skillRepository.save(newSkill)
        */
  }

  async editSkill(
    body: CreateUpdateSkillDto,
    file: Express.Multer.File,
    id: string,
  ) {
    if (file) {
      /* Delete image S3 */
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
    }
    /* const newSkill = this.skillRepository.create({
            ...body,
            image: listImage[0]
        }) 
        this.skillRepository.save(newSkill)
        */
  }

  async destroySkill(id: string) {
    try {
      await this.skillRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
