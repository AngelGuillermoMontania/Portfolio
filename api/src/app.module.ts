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

import { ProjectModule } from './modules/project/project.module';
import { AboutService } from './modules/about/about.service';
import { AboutModule } from './modules/about/about.module';
import 'dotenv/config';
import { User } from './models/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './modules/contact/contact.module';
import { MessageModule } from './modules/message/message.module';
import { ResumeModule } from './modules/resume/resume.module';
import { SkillModule } from './modules/skill/skill.module';
import { SoftModule } from './modules/soft/soft.module';
import { ToolModule } from './modules/tool/tool.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'portfolio',
      synchronize: true,
      autoLoadEntities: true, //Automatic Load Models Database
      logging: false,
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
