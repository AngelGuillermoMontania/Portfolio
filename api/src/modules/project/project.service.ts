import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//Used Models
import { Project } from 'src/models/project.entity';
import { Skill } from 'src/models/skill.entity';
import { Tool } from 'src/models/tool.entity';
import { Repository } from 'typeorm';

//DTO
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';

import fs, { access } from 'fs';
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
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getAll(): Promise<
    Project[] | NotFoundException | InternalServerErrorException
  > {
    try {
      let allProject: Project[] = await this.projectRepository.find();
      if (allProject.length < 1) {
        return new NotFoundException('Empty List');
      }
      return allProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error'); //Error nest with error server
    }
  }

  async getOne(id: string) {
    try {
      let oneProject = await this.projectRepository.findOne({
        where: {
          id,
        },
        relations: ['Skills', 'Tools'],
      });
      return oneProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createProject(
    body: CreateUpdateProjectDto,
    files: Array<Express.Multer.File>,
  ) {
    try {
      const newProject = this.projectRepository.create(body); //Create the project
      await this.projectRepository.save(newProject); //Save the project

      /* Init load images S3 */
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
      /* Finish load images S3 */

      /**
       * Agregar Skills
       * Agregar Tools
       */
      return newProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async updateProject(id: string, body: CreateUpdateProjectDto) {
    try {
      //PRELOAD   busca y actualiza, hace un merge
      const modifiedProyect = this.projectRepository.find();
      let proyect = await this.projectRepository.find();
      return proyect;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async deleteProject(
    id: string,
  ): Promise<'SE ELIMINO CORRECTAMENTE' | InternalServerErrorException> {
    try {
      const deleteProject = await this.projectRepository.delete(id);
      return 'SE ELIMINO CORRECTAMENTE';
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
