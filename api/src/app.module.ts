import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AboutController } from './about/about.controller';

import { Project } from './models/project.entity';
import { Skill } from './models/skill.entity';
import { Tool } from './models/tool.entity';
import { SoftSkill } from './models/softSkill.entity';
import { Resume } from './models/resume.entity';
import { About } from './models/about.entity';
import { Reference } from './models/reference.entity';
import { Contact } from './models/contact.entity';
import { Message } from './models/message.entity';

import { ProjectModule } from './modules/project/project.module';
import 'dotenv/config'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'portfolio',
      synchronize: true,
      autoLoadEntities: true,   //Automatic Load Models Database
      logging: false,
      entities: [Project, Skill, Tool, SoftSkill, Resume, About, Reference, Contact, Message],  //Models DB
    }),
    ProjectModule,
  ],
  controllers: [AboutController],
  providers: [],
})
export class AppModule {}
