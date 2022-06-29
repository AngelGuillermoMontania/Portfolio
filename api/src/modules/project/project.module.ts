import { Module } from '@nestjs/common';
/* import { SequelizeModule } from '@nestjs/sequelize'; */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../models/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
  exports: [TypeOrmModule],
  controllers: [ProjectController],
})
export class ProjectModule {}
