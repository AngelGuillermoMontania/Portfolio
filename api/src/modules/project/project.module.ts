import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from 'src/models/skill.entity';
import { Tool } from 'src/models/tool.entity';
import { Project } from '../../models/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Tool, Skill])],
  providers: [ProjectService],
  exports: [TypeOrmModule],
  controllers: [ProjectController],
})
export class ProjectModule {}
