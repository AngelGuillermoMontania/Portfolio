import { Injectable, InternalServerErrorException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Tool } from 'src/models/tool.entity';
import { CreateUpdateToolDto } from './dto/create-update-tool.dto';

import { createReadStream } from 'fs';
import { s3Client } from 'src/libs/sampleClient';

import 'dotenv/config';

const bucketName = process.env.AWS_BUCKET_NAME || ""

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(Tool) private toolRepository: Repository<Tool>,
  ) {}

  async getAllTool() {
    try {
      const allTools = await this.toolRepository.find();
      return allTools;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async getImageTool(name: string) {
    const bucketParams = {
      Key: name,
      Bucket: bucketName
    }
    var fileStream = s3Client.getObject(bucketParams).createReadStream();
    return new StreamableFile(fileStream)
  }

  async createImageTool(file: Express.Multer.File) {
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

  async destroyImageTool(id: string) {
    try {
      const deleteImageSkill = await this.toolRepository.findOneBy({ id });
      if (deleteImageSkill) {
        const bucketParams = {
          Key: deleteImageSkill?.image,
          Bucket: bucketName
        }
        await s3Client.deleteObject(bucketParams).promise()
      }
      return "success"
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async createDataTool(body: CreateUpdateToolDto) {
    try {
      const newTool = this.toolRepository.create(body);
      await this.toolRepository.save(body);
      return newTool;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async editTool(body: CreateUpdateToolDto, id: string) {
    try {
      const newToolEdit = await this.toolRepository.update(
        {
          id,
        },
        body,
      );
      const toolEdit = await this.toolRepository.findOne({
        where: {
          id,
        },
      });
      return toolEdit;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
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
