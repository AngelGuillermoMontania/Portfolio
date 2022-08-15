import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Tool } from 'src/models/tool.entity';
import { CreateUpdateToolDto } from './dto/create-update-tool.dto';

import { createReadStream, existsSync, unlinkSync } from 'fs';

import { join } from 'path';
import 'dotenv/config';

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

  async createImageTool(file: Express.Multer.File) {
    const fileStream = createReadStream(file.path);
    try {
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
        if (
          existsSync(join(process.cwd(), '/assets/', deleteImageSkill?.image))
        ) {
          unlinkSync(join(process.cwd(), '/assets/', deleteImageSkill?.image));
        }
      }
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
