import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from '../../models/project.model';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  providers: [ProjectService],
  exports: [SequelizeModule],
  controllers: [ProjectController],
})
export class ProjectModule {}
