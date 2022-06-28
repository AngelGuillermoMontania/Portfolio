import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AboutController } from './about/about.controller';

import { Image } from './models/image.model';
import { Project } from './models/project.model';
import { Skill } from './models/skill.model';
import { ProjectSkill } from './models/projectSkill.model';
import { ProjectTool } from './models/projectTool.model';
import { Tool } from './models/tool.model';
import { SoftSkill } from './models/softSkill.model';
import { Resume } from './models/resume.model';
import { About } from './models/about.model';
import { Reference } from './models/reference.model';
import { Contact } from './models/contact.model';

import { ProjectModule } from './modules/project/project.module';
import { Message } from './models/message.model';
import 'dotenv/config'
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'portfolio',
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      models: [Project, Image, ProjectSkill, Skill, ProjectTool, Tool, SoftSkill, Resume, About, Reference, Contact, Message],
    }),
    ProjectModule,
  ],
  controllers: [AboutController],
  providers: [],
})
export class AppModule {}
