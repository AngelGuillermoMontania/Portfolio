import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Tool } from 'src/models/tool.entity';
import { CreateUpdateToolDto } from './dto/create-update-tool.dto';

import { S3Client, CreateBucketCommand, PutObjectCommand, DeleteBucketCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
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
export class ToolService {
  constructor(
    @InjectRepository(Tool) private toolRepository: Repository<Tool>,
  ) {}

  
  async getAllTool() {
    try {
      const allSkills = await this.toolRepository.find();
      return allSkills;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createImageTool(file: Express.Multer.File) {
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

  async destroyImageTool(id: string) {
    try {
      const deleteImageTool = await this.toolRepository.findOneBy({id})
      let listImage = [];
        const bucketParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: deleteImageTool?.image,
        };
        listImage.push(await client.send(new DeleteObjectCommand(bucketParams)));
        return {
          name: deleteImageTool?.image
        }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3')
    }
  }

  async createDataTool(body: CreateUpdateToolDto) {
    try {
      const newTool = this.toolRepository.create(body)
      await this.toolRepository.save(body)
      return newTool
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
    
  }

  async editTool(
    body: CreateUpdateToolDto,
    id: string,
  ) {
    try {
      const newToolEdit = await this.toolRepository.update({
        id
      }, body)
      const toolEdit = await this.toolRepository.findOne({where: {
        id
      }})
      return toolEdit
    } catch (error) {
      return new InternalServerErrorException("Database Error")
    }
    
  }

  async destroyTool(id: string) {
    try {
      await this.toolRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
