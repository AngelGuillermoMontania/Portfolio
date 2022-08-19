import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './models/project.entity';
import { Skill } from './models/skill.entity';
import { Tool } from './models/tool.entity';
import { SoftSkill } from './models/softSkill.entity';
import { Resume } from './models/resume.entity';
import { About } from './models/about.entity';
import { Contact } from './models/contact.entity';
import { Message } from './models/message.entity';
import { User } from './models/user.entity';

import { ProjectModule } from './modules/project/project.module';
import { AboutModule } from './modules/about/about.module';
import { ContactModule } from './modules/contact/contact.module';
import { MessageModule } from './modules/message/message.module';
import { ResumeModule } from './modules/resume/resume.module';
import { SkillModule } from './modules/skill/skill.module';
import { SoftModule } from './modules/soft/soft.module';
import { ToolModule } from './modules/tool/tool.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';

import 'dotenv/config';
@Module({
  imports: [
    process.env.NODE_ENV
      ? TypeOrmModule.forRoot({
          type: 'postgres',
          host: '3001',
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          synchronize: true,
          logging: false,
          ssl: {
            rejectUnauthorized: false,
          },
          keepConnectionAlive: true,
          autoLoadEntities: true, //Automatic Load Models Database
          entities: [
            Project,
            Skill,
            Tool,
            SoftSkill,
            Resume,
            About,
            Contact,
            Message,
            User,
          ], //Models DB
        })
      : TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: 'portfolio',
          synchronize: true,
          logging: false,
          autoLoadEntities: true, //Automatic Load Models Database
          entities: [
            Project,
            Skill,
            Tool,
            SoftSkill,
            Resume,
            About,
            Contact,
            Message,
            User,
          ], //Models DB
        }),
    ProjectModule,
    AboutModule,
    ContactModule,
    MessageModule,
    ResumeModule,
    SkillModule,
    SoftModule,
    ToolModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
